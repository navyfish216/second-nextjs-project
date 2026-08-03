"use client";

import { useState } from "react";
import useSWR from "swr";
import clsx from 'clsx';
// import Cookies from 'js-cookie';
import { postLike } from "@/services/like/postLike";
import type { Like } from "@/type";
import styles from "./style.module.css";

// useSWR用fetcher
const fetcher = async (url: string): Promise<Like> => await fetch(url).then(res => res.json());

export function LikeButton({ photoId }: { photoId: string }) {

  // cookieから認証トークンを取得（↓は取れてない）
  // const token = Cookies.get('auth-token');
  // console.log(`LikeButton token: ${token}`);

  // ページ側からいいね情報を渡す場合はuseStateを使用
  // const [like, setLike] = useState(data);
  const [isProcessing, setIsProcessing] = useState(false);

  const url: string = `/api/photos/${photoId}/like`;
  // フォーカスON時のfetchを抑止
  const {data, isLoading, mutate} = useSWR<Like>(url, fetcher, { revalidateOnFocus: false });
  // 5秒おきに再fetchする場合は↓（いいね数を勝手に最新化してくれるので便利）
  // const {data, isLoading, mutate} = useSWR<Like>(url, fetcher, { revalidateOnFocus: false, refreshInterval: 5000 });

  const handleLike = async () => {
    setIsProcessing(true);
    // サーバーから取り直すのではなく、自操作分だけ反映することでパフォーマンスを稼ぐ
    if (data !== undefined) {
      data.liked = !data.liked;
      data.likes = data.liked ? data.likes + 1 : data.likes - 1;
    }
    await postLike(photoId);
    // useSWR使用時はmutateでサーバーから再取得することもできるが、その分パフォーマンスは落ちる
    // mutate();
    setIsProcessing(false);
  };

  // useSWR使用時のローディング表示用
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
