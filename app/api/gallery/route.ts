import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const method = searchParams.get('method');
  const cut = searchParams.get('cut');
  const flagged = searchParams.get('flagged') === 'true';

  let sql: string;
  const params: string[] = [];

  if (flagged) {
    sql = 'SELECT * FROM gallery_posts WHERE report_count > 0 ORDER BY report_count DESC LIMIT 100';
  } else {
    sql = 'SELECT * FROM gallery_posts WHERE reported = 0';
    if (method) { sql += ' AND method = ?'; params.push(method); }
    if (cut) { sql += ' AND cut = ?'; params.push(cut); }
    sql += ' ORDER BY created_at DESC LIMIT 50';
  }

  const [rows] = await pool.execute(sql, params);
  return NextResponse.json({ posts: rows });
}
