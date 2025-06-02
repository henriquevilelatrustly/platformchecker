// lib/fetcher.ts

import { ResponseMatchType } from './rules';

const API_BASE = process.env.API_BASE || 'http://localhost:3000';

export async function checkResponse(url: string | undefined): Promise<ResponseMatchType> {
  try {
    const res = await fetch(`${API_BASE}/api/check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    return data.result as ResponseMatchType;
  } catch (err) {
    console.error('Erro ao consultar API local:', err);
    return ResponseMatchType.Unknown;
  }
}
