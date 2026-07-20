"use client";

import useSWR from "swr";
import clsx from 'clsx';
import { postLike } from "@/services/postLike";
import type { Like } from "@/type";
import styles from "./style.module.css";

const fetcher = async (url: string): Promise<Like> => await fetch(url).then(res => res.json());

export function LikeButton({ photoId, userId }: { photoId: string, userId: string }) {

  const searchParams = new URLSearchParams({ userId });
  const url: string = `http://localhost:8080/api/photos/${photoId}/like?${searchParams}`;

  const {data, isLoading, mutate} = useSWR<Like>(url, fetcher);

  const handleLike = async () => {
    const like: Like = await postLike(photoId, userId);
    console.log(`photoId ${photoId} liked: ${like.liked}, likes: ${like.likes}`);
    mutate();
  };

  if (isLoading) return (
    <div className={styles.field}>
      <div>
        <button className={clsx(
          styles.like__button__common, 
          styles.like__button__normal)}>
          <span className={clsx(
            styles.icon__common, 
            styles.icon__img, 
            styles.icon__color__normal)} />
          <span className={styles.span__likes} />
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.field}>
      <div>
        <button onClick={handleLike} className={clsx(
          styles.like__button__common,
          data?.liked ? styles.like__button__liked : styles.like__button__normal)}>
          <span className={clsx(
            styles.icon__common, 
            styles.icon__img, 
            data?.liked ? styles.icon__color_liked : styles.icon__color__normal)} />
          <span className={styles.span__likes}>{`${data?.likes}`}</span>
        </button>
      </div>
    </div>
  );
}
