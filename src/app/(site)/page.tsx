import Link from "next/link";
import getPhotos from "@/services/photo/getPhotos";
import styles from "./page.module.css";

export default async function Page() {
  // データを取得
  const photos = (await getPhotos()).map(({ id, title, imageUrl }) => ({ id, title, imageUrl }));
  return (
    <div className={styles.container}>
      <h2>トップ画面</h2>
      <div className={styles.wrapper}>
        {photos.map(({ id, title, imageUrl }) => (
          <div key={id}>
            <Link href={`/photos/${id}`}>
              {title}
              <div>
                <img src={imageUrl} width="320" height="240" alt={title}></img>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
