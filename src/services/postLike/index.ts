import type { Like } from "@/type";

export async function postLike(photoId: string, userId: string) {
  // const url = `/api/photos/${photoId}/like`;
  const url = `http://localhost:8080/api/photos/${photoId}/like`;
  const body: string = JSON.stringify({userId: userId});
  console.log(`[postLike] url: ${url}, body: ${body}`);
  await fetch(url, {
    method: "POST",
    body: body
  });
}
