import "server-only";
import { headers, cookies } from 'next/headers';

async function getUserId() {

  // cookieから認証トークンを取得
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  console.log(`api/photos/[photoId]/like token: ${token}`);

  // 認証トークンからユーザーIDを取得
  const authUrl: string = 'http://localhost:4000/api/auth';
  const body: string = JSON.stringify({authToken: token});
  console.log(`[POST AUTH] url: ${authUrl}, body: ${body}`);
  const data = await fetch(authUrl, {
    method: "POST",
    body: body
  }).then((res) => res.json());
  const userId = JSON.parse(data).userId;

  return userId;
}

export async function GET(
  _: Request,
  {params}: {params: Promise<{photoId: string}>}
) {
  const photoId = (await params).photoId;
//   const { searchParams } = new URL(request.url);

  const userId = await getUserId();
  console.log(`GET userId: ${userId}`);

  // ヘッダーからユーザーIDを取得
//   const headersList = await headers();
//   let userIdFromHeader = headersList.get('X-Custom-User');
//   userIdFromHeader = !!userIdFromHeader ? userIdFromHeader : "";
//   console.log(`api/photos/[photoId]/like X-Custom-User: ${userIdFromHeader}`);

//   let userId = searchParams.get("userId");
//   userId = userId ?? "";
  const searchParamsForFetch = new URLSearchParams({ userId });
  const url = `http://localhost:8080/api/photos/${photoId}/like?${searchParamsForFetch}`;

  return await fetch(url);
}

export async function POST(
  _: Request,
  {params}: {params: Promise<{photoId: string}>}
) {
  const photoId = (await params).photoId;
  const userId = await getUserId();
  console.log(`POST userId: ${userId}`);

  const res = await fetch(`http://localhost:8080/api/photos/${photoId}/like`, {
    method: "POST",
    body: JSON.stringify({userId: userId})
  });
  return res;
}