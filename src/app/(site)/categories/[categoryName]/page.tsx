
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Photo } from "@/type";
import getCategory from "@/services/category/getCategory";
import getPhotos from "@/services/photo/getPhotos";
import { getPage } from "@/utils";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ categoryName: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params, searchParams }: Props) {

  // ★: Promise.all を使用した並列データ取得
  const [category, photos] = await Promise.all([
    getCategory((await params).categoryName),
    getPhotos(),
  ]);
  // 🚧: 本来であれば、カテゴリーに紐づく写真のみを取得しページネーションを施す
  const page = getPage(await searchParams);

  // 11ページ以降は404扱いにする
  if (page > 10) {
    notFound();
  }

  // カテゴリが一致する写真データを抽出
  const filteredPhotos = photos.filter((photo) => photo.categoryId === category.id);
  // 1ページに表示する件数
  const lines = 10;
  // ページ番号から開始インデックスを計算
  const startIndex = (page -1) * lines
  // ページ番号から終了インデックスを計算
  const endIndex = page * lines;

  // ページに表示する写真データを抽出
  let photosToDisplay: Photo[] = [];
  if (filteredPhotos.length > startIndex) {
    for (let i = startIndex; i < endIndex; i++) {
      if (i < filteredPhotos.length) {
        photosToDisplay.push(filteredPhotos[i]);
      }
    }
  }

  return (
    <div>
      <h2>
        カテゴリー「{category.label}」の「{page}」ページ目
      </h2>
      <div className={styles.wrapper}>
        {photosToDisplay
          //.filter((photo) => photo.categoryId === category.id)
          .map((photo) => (
            <div key={photo.id}>
              <Link href={`/photos/${photo.id}`}>
                {photo.title}
                <div>
                  <img src={photo.imageUrl} width="320" height="240" alt={photo.title}></img>
                </div>
              </Link>
            </div>
          ))}
      </div>
      <ul className={styles.pagination}>
        {/* 1ページ目以外の場合に前へリンク表示 */}
        {page !== 1 && (
          <li className={styles.list}>
            <Link
              href={`/categories/${(await params).categoryName}?page=${page - 1}`}
            >
              前へ
            </Link>
          </li>
        )}
        {/* 最終ページ目以外の場合に次へリンク表示 */}
        {filteredPhotos.length > endIndex && (
          <li className={styles.list}>
            <Link
              href={`/categories/${(await params).categoryName}?page=${page + 1}`}
            >
              次へ
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
