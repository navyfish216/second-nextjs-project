import "server-only";
import { getAccessToken } from "@/utils/auth";

export async function GET(
  _: Request,
  {params}: {params: Promise<{photoId: string}>}
) {
  const photoId = (await params).photoId;

  const url = `http://localhost:8080/api/photos/${photoId}/like`;

  // 認証トークン取得
  const token = await getAccessToken();

  return await fetch(url, {
    headers: {
      'X-Access-Token': `${token}`,
    }
  });
}

export async function POST(
  _: Request,
  {params}: {params: Promise<{photoId: string}>}
) {
  const photoId = (await params).photoId;

  // 認証トークン取得
  const token = await getAccessToken();

  const res = await fetch(`http://localhost:8080/api/photos/${photoId}/like`, {
    method: "POST",
    headers: {
      'X-Access-Token': `${token}`,
    }
  });
  return res;
}