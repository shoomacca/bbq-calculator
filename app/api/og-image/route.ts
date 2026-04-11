import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  if (!url) return NextResponse.json({ image: null });

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-AU,en;q=0.9',
      },
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) return NextResponse.json({ image: null });
    const html = await res.text();

    // Try og:image first
    const ogMatch =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ??
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    if (ogMatch?.[1]) {
      return NextResponse.json({ image: ogMatch[1] }, {
        headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400' },
      });
    }

    // Fallback: look for Amazon's main product image pattern
    const imgMatch = html.match(/"hiRes"\s*:\s*"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/);
    if (imgMatch?.[1]) {
      return NextResponse.json({ image: imgMatch[1] }, {
        headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400' },
      });
    }

    return NextResponse.json({ image: null });
  } catch {
    return NextResponse.json({ image: null });
  }
}
