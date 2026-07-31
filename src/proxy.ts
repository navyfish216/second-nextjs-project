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

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // cookieに認証トークン存在しない場合は設定（有効期間：10分）
  let authToken = request.cookies.get('auth-token')?.value;
  if (!authToken) {

    const authUrl: string = 'http://localhost:8080/api/auth';
    const body: string = JSON.stringify({userId: "dummy", password: "********"});
    const data = await fetch(authUrl, {
      method: "POST",
      body: body
    }).then((res) => res.json());
    const authToken = JSON.parse(data).authToken;

    const date = new Date();
    console.log(`${formatDate(date)} proxy.ts auth-tokenを設定 : ${authToken}`);
    response.cookies.set('auth-token', authToken, {maxAge: 60 * 10});
  }

  return response;
}