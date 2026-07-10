import Link from "next/link";
import type { CategoryWithPhotos } from "@/type";
import styles from "../page.module.css";

async function getCategories() {
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

export default async function Page() {
  const categories = await getCategories();
  return (
    <div>
      <h2>カテゴリー一覧画面</h2>
      <div className={styles.wrapper}>
        {categories.map(({ id, label, name, photos }) => (
          <div key={id}>
            <Link href={`/categories/${name}`}>
              {label}
              {photos.length > 0 && (
                <div>
                  <img src={photos[0].imageUrl} width="320" height="240" alt={photos[0].title}></img>
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}