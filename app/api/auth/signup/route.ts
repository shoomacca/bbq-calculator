import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import pool from '@/lib/db';
import { hashPassword, signToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password || password.length < 6) {
      return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
    }

    // Check if user already exists
    const [existing] = await pool.execute<RowDataPacket[]>(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      return NextResponse.json({ error: 'user_exists' }, { status: 409 });
    }

    // Hash password & insert
    const passwordHash = hashPassword(password);
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO users (email, password_hash) VALUES (?, ?)',
      [email, passwordHash]
    );

    const userId = result.insertId;

    // Create session token
    const token = signToken({ userId, email });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return NextResponse.json({ success: true, user: { id: userId, email } });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
