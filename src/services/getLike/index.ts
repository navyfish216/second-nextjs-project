import type {GetLike} from "../type";

export async function getLike({
  userId,
  photoId,
}: {
  userId: string;
  photoId: string;
}): Promise<GetLike> {
  const searchParams = new URLSearchParams({ userId });
  const url = `http://localhost:8080/api/photos/${photoId}/like?${searchParams}`;
  console.log(`getLike.url: ${url}`);
  const getLike: GetLike = await fetch(url).then((res) => res.json());
  return getLike;
}
