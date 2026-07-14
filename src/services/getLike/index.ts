import type { Like } from "@/type";

export async function getLike({
  userId,
  photoId,
}: {
  userId: string;
  photoId: string;
}): Promise<Like> {
  const searchParams = new URLSearchParams({ userId });
  const url = `http://localhost:8080/api/photos/${photoId}/like?${searchParams}`;
  const getLike: Like = await fetch(url).then((res) => res.json());
  return getLike;
}
