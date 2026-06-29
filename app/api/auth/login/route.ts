import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { RowDataPacket } from 'mysql2';
import pool from '@/lib/db';
import { verifyPassword, signToken } from '@/lib/auth';

interface UserRow extends RowDataPacket {
  id: number;
  password_hash: string;
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
    }

    // Check if user exists
    const [rows] = await pool.execute<UserRow[]>(
      'SELECT id, password_hash FROM users WHERE email = ?',
      [email]
    );

    const user = rows[0];
    if (!user) {
      return NextResponse.json({ error: 'invalid_credentials' }, { status: 401 });
    }

    // Verify password
    const valid = verifyPassword(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ error: 'invalid_credentials' }, { status: 401 });
    }

    // Create session token
    const token = signToken({ userId: user.id, email });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return NextResponse.json({ success: true, user: { id: user.id, email } });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
