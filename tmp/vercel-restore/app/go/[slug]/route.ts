import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const [rows] = await pool.execute<any[]>(
    'SELECT affiliate_url FROM gear WHERE slug = ?',
    [slug]
  );

  const affiliateUrl = (rows as any[])[0]?.affiliate_url as string | undefined;

  // Log click — fire and forget
  pool.execute('INSERT INTO gear_clicks (gear_slug) VALUES (?)', [slug]).catch(() => {});

  // If no product found or placeholder URL, send to gear page
  if (!affiliateUrl || affiliateUrl === '#') {
    return NextResponse.redirect(new URL('/gear', 'https://bbq.bsbsbs.au'));
  }

  return NextResponse.redirect(affiliateUrl);
}
