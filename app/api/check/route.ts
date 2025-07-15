// app/api/check/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { analyzeResponseText, ResponseMatchType } from '@/lib/rules';

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  try {
    const response = await fetch(url, {redirect:'manual'});

    if (response.status >= 300 && response.status < 400) { 
      const location = response.headers.get('location') as string;
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
    console.error('Erro ao buscar URL:', error);
    return NextResponse.json({ result: ResponseMatchType.Unknown }, { status: 500 });
  }
}
