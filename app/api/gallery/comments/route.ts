import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import pool from '@/lib/db';
import { verifyToken, getAnonymousName } from '@/lib/auth';

async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  if (!sessionCookie) return null;
  return verifyToken(sessionCookie.value);
}

interface CommentDbRow extends RowDataPacket {
  id: number;
  post_id: string;
  user_id: number;
  comment_text: string;
  created_at: string;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');
  if (!postId) {
    return NextResponse.json({ error: 'missing_post_id' }, { status: 400 });
  }

  try {
    const [rows] = await pool.execute<CommentDbRow[]>(
      'SELECT id, post_id, user_id, comment_text, created_at FROM post_comments WHERE post_id = ? ORDER BY created_at ASC',
      [postId]
    );

    const comments = rows.map((c) => ({
      id: c.id,
      postId: c.post_id,
      text: c.comment_text,
      createdAt: c.created_at,
      authorName: getAnonymousName(c.user_id),
    }));

    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Fetch comments error:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const { postId, commentText } = await req.json();
    if (!postId || !commentText || !commentText.trim()) {
      return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
    }

    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO post_comments (post_id, user_id, comment_text) VALUES (?, ?, ?)',
      [postId, user.userId, commentText.trim()]
    );

    const insertId = result.insertId;

    return NextResponse.json({
      success: true,
      comment: {
        id: insertId,
        postId,
        text: commentText.trim(),
        createdAt: new Date().toISOString(),
        authorName: getAnonymousName(user.userId),
      },
    });
  } catch (error) {
    console.error('Post comment error:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
