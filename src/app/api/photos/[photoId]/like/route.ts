import "server-only";
import { headers, cookies } from 'next/headers';

export async function GET(
  _: Request,
  {params}: {params: Promise<{photoId: string}>}
) {
  const photoId = (await params).photoId;

  const url = `http://localhost:8080/api/photos/${photoId}/like`;

  // cookieから認証トークンを取得
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  return await fetch(url, {
    headers: {
      'X-Auth-Token': `${token}`,
    }
  });
}

export async function POST(
  _: Request,
  {params}: {params: Promise<{photoId: string}>}
) {
  const photoId = (await params).photoId;

  // cookieから認証トークンを取得
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  const res = await fetch(`http://localhost:8080/api/photos/${photoId}/like`, {
    method: "POST",
    headers: {
      'X-Auth-Token': `${token}`,
    }
  });
  return res;
}