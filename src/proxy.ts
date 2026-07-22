import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function formatDateToYYYYMMDD_HH24(date: Date): string {
  
  // Intl.DateTimeFormat を使用したミリ秒の取得
  const formatter = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  console.log(formatter.format(date).replace(/\//g, '').replace(/\s/g, '_').replace(/:/g, ''));
  return formatter.format(date).replace(/\//g, '').replace(/\s/g, '_').replace(/:/g, '');    
}

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  
  // ユーザーIDをヘッダー追加
  response.headers.set('X-Custom-User', 'dummy');

  return response;
}