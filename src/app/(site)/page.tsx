import Link from "next/link";
import type { Photo } from "@/type";
import styles from "./page.module.css";

async function getPhotos() {
  const data: { photos: Photo[] } = await fetch(
    "http://localhost:8080/api/photos", 
    {cache: "no-store"}
  ).then((res) => res.json());
  return data.photos.map(({ id, title, imageUrl }) => ({ id, title, imageUrl }));
}

export default async function Page() {
  const photos = await getPhotos(); // <- データを取得
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
