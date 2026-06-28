// "use client";

//import { useRouter } from "next/navigation";
//import { use } from "react";
//import { LikeButton } from "../../_components/LikeButton";
import Link from "next/link";
import type { Category, Photo } from "@/type";
import { getPage } from "@/utils";
import styles from "./page.module.css";

async function getCategory(categoryName: string) {
  const data: { category: Category } = await fetch(
    `http://localhost:8080/api/categories/${categoryName}`
  ).then((res) => res.json());
  return data.category;
}

async function getPhotos() {
  const data: { photos: Photo[] } = await fetch(
    "http://localhost:8080/api/photos"
  ).then((res) => res.json());
  return data.photos;
}

type Props = {
    params: Promise<{categoryName: string}>;
    searchParams: Promise<{[key: string]: string | string[] | undefined}>;
}

export default async function Page({params, searchParams}: Props) {
    // const unwrapParams = use(params);
    // const unwrapSearchParams = use(searchParams);
    // const page = typeof unwrapSearchParams.page === "string" ? unwrapSearchParams.page : "1";
    // const router = useRouter();

  // ★: Promise.all を使用した並列データ取得
  const [category, photos] = await Promise.all([
    getCategory((await params).categoryName),
    getPhotos(),
  ]);
  // 🚧: 本来であれば、カテゴリーに紐づく写真のみを取得しページネーションを施す
  const page = getPage(await searchParams);

  return (
    <div>
      <h1>
        カテゴリー「{category.label}」の「{page}」ページ目
      </h1>
      <ul>
        {photos
          .filter((photo) => photo.categoryId === category.id)
          .map((photo) => (
            <li key={photo.id}>
              <Link href={`/photos/${photo.id}`}>{photo.title}</Link>
            </li>
          ))}
      </ul>
      <ul className={styles.pagination}>
        {page !== 1 && (
          <li>
            <Link href={`/categories/${(await params).categoryName}?page=${page - 1}`}>
              前へ
            </Link>
          </li>
        )}
        <li>
          <Link href={`/categories/${(await params).categoryName}?page=${page + 1}`}>
            次へ
          </Link>
        </li>
      </ul>
    </div>
  );
}
