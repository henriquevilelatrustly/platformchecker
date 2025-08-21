// app/api/check/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { analyzeResponseText, ResponseMatchType } from '@/lib/rules';

export const runtime = 'nodejs'; // optional: ensures Node runtime is used

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ result: ResponseMatchType.Unknown }, { status: 400 });
  }

  // Create AbortController with 15s timeout
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'manual',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'keep-alive',
      },
    });

    clearTimeout(timeout); // Clear timeout if success

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location') ?? '';
      console.log('Redirect to:', location);

      if (location.includes('validate.perfdrive')) {
        return NextResponse.json({ result: ResponseMatchType.RadwareBlock });
      }
    }

    const text = await response.text();
    const cookies = response.headers.get('set-cookie');

    const result = analyzeResponseText(text, cookies, response.status);

    return NextResponse.json({ result });
  } catch (error) {
    clearTimeout(timeout);
    console.error('Erro ao buscar URL:', error);
    return NextResponse.json({ result: ResponseMatchType.Unknown }, { status: 500 });
  }
}
