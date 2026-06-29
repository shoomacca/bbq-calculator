import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import pool from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  if (!sessionCookie) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const user = verifyToken(sessionCookie.value);
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const { cooks } = await req.json();
    if (!cooks || !Array.isArray(cooks)) {
      return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
    }

    // Insert all cooks
    for (const cook of cooks) {
      if (!cook.method || !cook.cutName || !cook.weightKg) continue;

      await pool.execute(
        'INSERT INTO saved_cooks (user_id, method, meat_category, cut, weight_kg, result_json) VALUES (?, ?, ?, ?, ?, ?)',
        [
          user.userId,
          cook.method,
          cook.categoryName || '',
          cook.cutName,
          cook.weightKg,
          JSON.stringify(cook),
        ]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sync cooks error:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
