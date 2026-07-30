import "server-only";
import { getToken } from "@/utils/auth";

export async function GET(
  _: Request,
  {params}: {params: Promise<{photoId: string}>}
) {
  const photoId = (await params).photoId;

  const url = `http://localhost:8080/api/photos/${photoId}/like`;

  // 認証トークン取得
  const token = await getToken();

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

  // 認証トークン取得
  const token = await getToken();

  const res = await fetch(`http://localhost:8080/api/photos/${photoId}/like`, {
    method: "POST",
    headers: {
      'X-Auth-Token': `${token}`,
    }
  });
  return res;
}