import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'missing_token' }, { status: 400 });
  }

  const [rows] = await pool.execute(
    'SELECT id, unsubscribed_at FROM subscribers WHERE unsubscribe_token = ?',
    [token]
  );

  const subscriber = (rows as { id: number; unsubscribed_at: string | null }[])[0];

  if (!subscriber) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  if (!subscriber.unsubscribed_at) {
    await pool.execute(
      'UPDATE subscribers SET unsubscribed_at = NOW() WHERE unsubscribe_token = ?',
      [token]
    );
  }

  return NextResponse.json({ success: true });
}
