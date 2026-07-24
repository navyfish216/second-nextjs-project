import type { Photo } from "@/type";

export default async function getPhotos() {
  const data: { photos: Photo[] } = await fetch(
    "http://localhost:8080/api/photos",
  ).then((res) => res.json());
  return data.photos;
}