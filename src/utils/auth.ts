import "server-only";
import { cookies } from "next/headers";

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

export async function getToken() {

  // cookieから認証トークンを取得
  const cookieStore = await cookies();
  let authToken = cookieStore.get('auth-token')?.value;
  console.log(`${formatDate(new Date())} auth.ts:getToken authToken : ${authToken}`);

  // cookieに認証トークン存在しない場合は設定（有効期間：10分）
  if (!authToken) {
    const newAuthToken = await auth("dummy", "********");
    cookieStore.set('auth-token', newAuthToken, {maxAge: 60 * 10});
    authToken = newAuthToken;
    console.log(`${formatDate(new Date())} auth.ts:getToken auth-tokenを設定 : ${authToken}`);
  }

  return authToken;
}

export async function auth(userId: string, password: string) {

  const authUrl: string = 'http://localhost:8080/api/auth';
  const body: string = JSON.stringify({userId: userId, password: password});
  const data = await fetch(authUrl, {
    method: "POST",
    body: body
  }).then((res) => res.json());
  const authToken = JSON.parse(data).authToken;

  return authToken;
}