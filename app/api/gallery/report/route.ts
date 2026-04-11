import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request) {
  const { postId } = await req.json();
  if (!postId) return NextResponse.json({ error: 'Missing postId' }, { status: 400 });

  await pool.execute(
    `UPDATE gallery_posts
     SET report_count = report_count + 1,
         reported = IF(report_count + 1 >= 3, 1, 0)
     WHERE id = ?`,
    [postId]
  );

  return NextResponse.json({ ok: true });
}
