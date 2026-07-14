import type {Like} from "../type";

export async function postLike(photoId: string, userId: string): Promise<Like> {
  const body: string = JSON.stringify({userId: userId});
  console.log(`postLike: ${body}`);
  const like: Like = await fetch(`/api/photos/${photoId}/like`, {
    method: "POST",
    body: body
  }).then((res) => res.json());
  return like;
}
