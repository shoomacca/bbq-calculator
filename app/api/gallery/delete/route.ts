import { NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import path from 'path';
import { RowDataPacket } from 'mysql2';
import pool from '@/lib/db';

const BASE_URL = 'https://bbq.bsbsbs.au/uploads/gallery';
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'gallery');

interface PostRow extends RowDataPacket {
  before_url: string;
  after_url: string;
}

export async function DELETE(req: Request) {
  const adminPass = req.headers.get('x-admin-password');
  if (!adminPass || adminPass !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { postId } = await req.json();
  if (!postId) return NextResponse.json({ error: 'Missing postId' }, { status: 400 });

  // Fetch URLs before deleting the row
  const [rows] = await pool.execute<PostRow[]>(
    'SELECT before_url, after_url FROM gallery_posts WHERE id = ?',
    [postId]
  );

  if (rows.length) {
    const post = rows[0];
    for (const url of [post.before_url, post.after_url]) {
      const filename = url.replace(BASE_URL + '/', '');
      try {
        await unlink(path.join(UPLOAD_DIR, filename));
      } catch {
        // File already missing — ignore
      }
    }
  }

  await pool.execute('DELETE FROM gallery_posts WHERE id = ?', [postId]);
  return NextResponse.json({ ok: true });
}
