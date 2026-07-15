"use client";

import { useState } from "react";
import { postLike } from "@/services/postLike";
import type { Like } from "@/type";
import styles from "./style.module.css";

export function LikeButton({ photoId, userId, like }: { photoId: string, userId: string, like: Like }) {
  let likes = like.likes;
  let liked = like.liked;
  const [useLikes, setLikes] = useState(likes);
  const [useLiked, setLiked] = useState(liked);

  const handleLike = async () => {
    const like: Like = await postLike(photoId, userId);
    console.log(`photoId ${photoId} liked: ${like.liked}, likes: ${like.likes}`);
    setLiked(like.liked);
    setLikes(like.likes);
  };

  return (
    <div className={styles.field}>
        <div>
          <button onClick={handleLike} className={useLiked ? styles.likebutton_liked : styles.likebutton}>
            {useLiked ? "🤍" : "❤️"} {`${useLikes}`}
          </button>
        </div>
    </div>
  );
}
