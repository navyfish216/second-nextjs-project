import type { CategoryWithPhotos } from "@/type";

export default async function getCategory(categoryName: string) {
  const data: { category: CategoryWithPhotos } = await fetch(
    `http://localhost:8080/api/categories/${categoryName}`,
  ).then((res) => res.json());
  return data.category;
}