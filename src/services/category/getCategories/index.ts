import type { CategoryWithPhotos } from "@/type";

export default async function getCategories() {
  const data: { categories: CategoryWithPhotos[] } = await fetch(
    `http://localhost:8080/api/categories`,
    {
      next: {
        revalidate: 15
      },
    }
  ).then((res) => res.json());
  return data.categories;
}
