import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { RowDataPacket } from 'mysql2';
import pool from '@/lib/db';
import { verifyToken, getAnonymousName } from '@/lib/auth';

interface GalleryDbRow extends RowDataPacket {
  id: string;
  before_url: string;
  after_url: string;
  name: string | null;
  cut: string;
  method: string;
  gear_used: string | null;
  report_count: number;
  reported: number;
  created_at: string;
  user_id: number | null;
  star_count?: number;
  comment_count?: number;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const method = searchParams.get('method');
  const cut = searchParams.get('cut');
  const flagged = searchParams.get('flagged') === 'true';

  let sql: string;
  const params: string[] = [];

  if (flagged) {
    sql = `
      SELECT p.*,
        (SELECT COUNT(*) FROM post_stars WHERE post_id = p.id) as star_count,
        (SELECT COUNT(*) FROM post_comments WHERE post_id = p.id) as comment_count
      FROM gallery_posts p 
      WHERE p.report_count > 0 
      ORDER BY p.report_count DESC 
      LIMIT 100
    `;
  } else {
    sql = `
      SELECT p.*,
        (SELECT COUNT(*) FROM post_stars WHERE post_id = p.id) as star_count,
        (SELECT COUNT(*) FROM post_comments WHERE post_id = p.id) as comment_count
      FROM gallery_posts p 
      WHERE p.reported = 0
    `;
    if (method) {
      sql += ' AND p.method = ?';
      params.push(method);
    }
    if (cut) {
      sql += ' AND p.cut = ?';
      params.push(cut);
    }
    sql += ' ORDER BY p.created_at DESC LIMIT 50';
  }

  try {
    const [rows] = await pool.execute<GalleryDbRow[]>(sql, params);

    // Get starred posts for current user
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');
    const starredSet = new Set<string>();
    
    if (sessionCookie) {
      const user = verifyToken(sessionCookie.value);
      if (user) {
        const [starredRows] = await pool.execute<RowDataPacket[]>(
          'SELECT post_id FROM post_stars WHERE user_id = ?',
          [user.userId]
        );
        starredRows.forEach((r) => starredSet.add(r.post_id));
      }
    }

    const posts = rows.map((row) => ({
      id: row.id,
      before_url: row.before_url,
      after_url: row.after_url,
      name: row.user_id ? getAnonymousName(row.user_id) : (row.name || 'Anonymous Pitmaster'),
      cut: row.cut,
      method: row.method,
      gear_used: row.gear_used,
      report_count: row.report_count,
      created_at: row.created_at,
      star_count: row.star_count ?? 0,
      comment_count: row.comment_count ?? 0,
      has_starred: starredSet.has(row.id),
    }));

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Gallery fetch error:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
