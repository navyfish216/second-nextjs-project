import Link from "next/link";
import type { Category } from "@/type";
import styles from "../page.module.css";

async function getCategories() {
  const data: { categories: Category[] } = await fetch(
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
      <ul className={styles.ul}>
        {categories.map(({ id, label, name }) => (
          <li key={id} className={styles.list}>
            <Link href={`/categories/${name}`}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}