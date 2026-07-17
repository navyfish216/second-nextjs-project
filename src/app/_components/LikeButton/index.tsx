"use client";

import { useState } from "react";
import { postLike } from "@/services/postLike";
import type { Like } from "@/type";
import styles from "./style.module.css";

export function LikeButton({ photoId, userId, like }: { photoId: string, userId: string, like: Like }) {
  const [likeState, setLikeState] = useState(like);

  const handleLike = async () => {
    const like: Like = await postLike(photoId, userId);
    console.log(`photoId ${photoId} liked: ${like.liked}, likes: ${like.likes}`);
    setLikeState(like);
  };

  return (
    <div className={styles.field}>
        <div>
          <button onClick={handleLike} className={likeState.liked ? styles.like__button__liked : styles.like__button}>
            {likeState.liked ? "🤍" : "❤️"} {`${likeState.likes}`}
          </button>
        </div>
    </div>
  );
}
