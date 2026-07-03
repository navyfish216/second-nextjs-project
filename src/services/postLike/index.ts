import type {Like} from "../type";

export async function postLike(id: string) {
  const like: Like = await fetch(`/api/photos/${id}/like`, {
    method: "POST",
  }).then((res) => res.json());
  return like;
}
