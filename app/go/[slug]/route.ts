import { NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2';
import pool from '@/lib/db';

interface GearRow extends RowDataPacket {
  affiliate_url: string;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const [rows] = await pool.execute<GearRow[]>(
    'SELECT affiliate_url FROM gear WHERE slug = ?',
    [slug]
  );

  const affiliateUrl = rows[0]?.affiliate_url;

  // Log click — fire and forget
  pool.execute('INSERT INTO gear_clicks (gear_slug) VALUES (?)', [slug]).catch(() => {});

  // If no product found or placeholder URL, send to gear page
  if (!affiliateUrl || affiliateUrl === '#') {
    return NextResponse.redirect(new URL('/gear', 'https://bbq.bsbsbs.au'));
  }

  return NextResponse.redirect(affiliateUrl);
}
