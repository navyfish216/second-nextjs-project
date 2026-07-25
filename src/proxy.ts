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
  const session = request.cookies.get('session');

  // cookieに認証トークン存在しない場合は設定（有効期間：10分）
  let authToken = request.cookies.get('auth-token')?.value;
  if (!authToken) {
    console.log("proxy.ts auth-tokenを設定");
    authToken = 'dummy-token';
    response.cookies.set('auth-token', authToken, { expires: 1/144 });
  }

  // ユーザーIDをヘッダー追加
  response.headers.set('X-Custom-User', 'dummy');

  return response;
}