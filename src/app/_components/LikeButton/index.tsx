"use client";

import { useState } from "react";
import useSWR from "swr";
import clsx from 'clsx';
import { postLike } from "@/services/like/postLike";
import type { Like } from "@/type";
import styles from "./style.module.css";

const fetcher = async (url: string): Promise<Like> => await fetch(url).then(res => res.json());

export function LikeButton({ photoId, userId }: { photoId: string, userId: string }) {

  const [isProcessing, setIsProcessing] = useState(false);

  const searchParams = new URLSearchParams({ userId });
  const url: string = `http://localhost:8080/api/photos/${photoId}/like?${searchParams}`;

  const {data, isLoading, mutate} = useSWR<Like>(url, fetcher);

  const handleLike = async () => {
    setIsProcessing(true);
    await postLike(photoId, userId);
    mutate();
    setIsProcessing(false);
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
          <span className={clsx(styles.span__likes, styles.mgr__9)} />
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.field}>
      <div>
        <button onClick={handleLike} disabled={isProcessing} className={clsx(
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
