import Link from "next/link";
import getCategories from "@/services/category/getCategories";
import styles from "../page.module.css";

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