import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { RowDataPacket } from 'mysql2';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';

async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  if (!sessionCookie) return null;
  return verifyToken(sessionCookie.value);
}

export async function POST(req: Request) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const { postId } = await req.json();
    if (!postId) {
      return NextResponse.json({ error: 'missing_post_id' }, { status: 400 });
    }

    // Check if star exists
    const [existing] = await pool.execute<RowDataPacket[]>(
      'SELECT post_id FROM post_stars WHERE user_id = ? AND post_id = ?',
      [user.userId, postId]
    );

    let starred = false;
    if (existing.length > 0) {
      // Delete star
      await pool.execute(
        'DELETE FROM post_stars WHERE user_id = ? AND post_id = ?',
        [user.userId, postId]
      );
      starred = false;
    } else {
      // Insert star
      await pool.execute(
        'INSERT INTO post_stars (user_id, post_id) VALUES (?, ?)',
        [user.userId, postId]
      );
      starred = true;
    }

    // Get updated star count
    const [countRows] = await pool.execute<RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM post_stars WHERE post_id = ?',
      [postId]
    );
    const starCount = countRows[0]?.count ?? 0;

    return NextResponse.json({ success: true, starred, starCount });
  } catch (error) {
    console.error('Star toggle error:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
