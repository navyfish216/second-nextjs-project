//import { use } from "react";
//import { LikeButton } from "./LikeButton";
import Link from "next/link";
import type { CategoryWithPhotos, PhotoWithCategory } from "@/type";
import type { Metadata, ResolvingMetadata } from "next";
import { getLike } from "@/services/getLike";
import { LikeButton } from "@/app/_components/LikeButton";
import styles from "./page.module.css";

async function getPhoto(photoId: string) {
  const data: { photo: PhotoWithCategory } = await fetch(
    `http://localhost:8080/api/photos/${photoId}`,
  ).then((res) => res.json());
  return data.photo;
}

async function getCategory(categoryId: string) {
  const data: { category: CategoryWithPhotos } = await fetch(
    `http://localhost:8080/api/categories/id/${categoryId}`,
  ).then((res) => res.json());
  return data.category;
}

type Props = {
  params: Promise<{ photoId: string }>;
};

export async function generateMetadata(
  { params }: Props, 
  parent: ResolvingMetadata
): Promise<Metadata> {
  const photo = await getPhoto((await params).photoId);
  const {title, description} = await parent;
  return {
    title: `投稿写真「${photo.title}」 | ${title?.absolute}`,
    description: `${description} / ${photo.description}`,
  };
}

export default async function Page({ params }: Props) {
  const photo = await getPhoto((await params).photoId);
  const userId = "dummy";
  // const category = await getCategory(photo.categoryId);
  return (
    <div>
      <h2>{photo.title}</h2>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>概要</th>
            <td>{photo.description}</td>
          </tr>
          <tr>
            <th>写真</th>
            <td><img src={photo.imageUrl} width="640" height="480" alt={photo.title}></img></td>
          </tr>
          <tr>
            <th>カテゴリー</th>
            <td>
              <Link href={`/categories/${photo.category.name}`}>
                {photo.category.label}
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
      <LikeButton photoId={(await params).photoId} userId={userId} />
    </div>
  );
}
