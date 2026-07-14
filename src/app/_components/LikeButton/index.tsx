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
    const data: Like = await postLike(photoId, userId);
    console.log(`photoId ${photoId} liked: ${data.liked}`);

    setLiked(!useLiked);
    
    if (useLiked) {
      setLikes(useLikes - 1);
    } else {
      setLikes(useLikes + 1);
    }
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
