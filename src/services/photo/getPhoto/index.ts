import type { PhotoWithCategory } from "@/type";

export default async function getPhoto(photoId: string) {
  const data: { photo: PhotoWithCategory } = await fetch(
    `http://localhost:8080/api/photos/${photoId}`,
  ).then((res) => res.json());
  return data.photo;
}
