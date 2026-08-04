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

export async function getAccessToken() {

  // cookieからアクセストークンを取得
  const cookieStore = await cookies();
  let accessToken = cookieStore.get('access-token')?.value;
  console.log(`${formatDate(new Date())} auth.ts:getAccessToken accessToken : ${accessToken}`);

  // cookieにアクセストークン存在しない場合
  if (!accessToken) {
    // リフレッシュトークンを取得
    let refreshToken = cookieStore.get('refresh-token')?.value;
    console.log(`${formatDate(new Date())} auth.ts:getAccessToken refreshToken : ${refreshToken}`);

    // cookieにリフレッシュトークンが存在しない場合はログインして取得
    if (!refreshToken) {
      const newRefreshToken = await login("dummy", "********");
      // cookieにリフレッシュトークンを設定（有効期間：7日）
      cookieStore.set('refresh-token', newRefreshToken, {maxAge: 60 * 60 * 24 * 7});
      refreshToken = newRefreshToken;
      console.log(`${formatDate(new Date())} auth.ts:getAccessToken refresh-tokenを設定 : ${refreshToken}`);
    }

    // リフレッシュトークンからアクセストークンを取得して設定（有効期間：10分）
    const newAccessToken = await token(refreshToken);
    cookieStore.set('access-token', newAccessToken, {maxAge: 60 * 10});
    accessToken = newAccessToken;
    console.log(`${formatDate(new Date())} auth.ts:getAccessToken access-tokenを設定 : ${accessToken}`);
  }

  return accessToken;
}

export async function login(userId: string, password: string) {

  const url: string = 'http://localhost:8080/api/auth/login';
  const body: string = JSON.stringify({userId: userId, password: password});
  const data = await fetch(url, {
    method: "POST",
    body: body
  }).then((res) => res.json());
  const refreshToken = JSON.parse(data).refreshToken;

  return refreshToken;
}

export async function token(refreshToken: string | undefined) {

  const url: string = 'http://localhost:8080/api/auth/token';
  const data = await fetch(url, {
    method: "GET",
    headers: {
      'X-Refresh-Token': `${refreshToken}`,
    }  
  }).then((res) => res.json());
  const accessToken = JSON.parse(data).accessToken;

  return accessToken;
}
