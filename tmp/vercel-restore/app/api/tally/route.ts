import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  const [rows] = await pool.query('SELECT count FROM cook_tally WHERE id = 1');
  const count = (rows as { count: number }[])[0]?.count ?? 0;
  return NextResponse.json({ count });
}

export async function POST() {
  await pool.query('UPDATE cook_tally SET count = count + 1 WHERE id = 1');
  const [rows] = await pool.query('SELECT count FROM cook_tally WHERE id = 1');
  const count = (rows as { count: number }[])[0]?.count ?? 0;
  return NextResponse.json({ count });
}
