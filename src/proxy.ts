import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function formatDate(date: Date): string {
  
  // Intl.DateTimeFormat を使用したミリ秒の取得
  const formatter = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3 // ミリ秒を3桁で指定
  });

  return formatter.format(date);    
}

function formatDateToTimestamp(date: Date): string {
  
  // Intl.DateTimeFormat を使用したミリ秒の取得
  const formatter = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3 // ミリ秒を3桁で指定
  });

  return formatter.format(date).replace(/\//g, '').replace(/\s/g, '_').replace(/:/g, '').replace(/\./g, '_');
}

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const session = request.cookies.get('session');

  // cookieに認証トークン存在しない場合は設定（有効期間：10分）
  let authToken = request.cookies.get('auth-token')?.value;
  if (!authToken) {
    const date = new Date();
    const timestamp = formatDateToTimestamp(date);
    console.log(`${formatDate(date)} proxy.ts auth-tokenを設定 : dummy-token-${timestamp}`);
    authToken = `dummy-token-${timestamp}`;
    response.cookies.set('auth-token', authToken, {maxAge: 60 * 10});
  }

  // ユーザーIDをヘッダー追加
  // response.headers.set('X-Custom-User', 'dummy');

  return response;
}