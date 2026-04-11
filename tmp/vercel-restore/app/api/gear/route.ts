import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '100', 10), 100);

  let sql = 'SELECT * FROM gear';
  const params: (string | number)[] = [];

  if (category) {
    sql += ' WHERE category = ?';
    params.push(category);
  }
  sql += ' ORDER BY sort_order ASC LIMIT ?';
  params.push(limit);

  const [rows] = await pool.execute(sql, params);
  return NextResponse.json({ gear: rows });
}
