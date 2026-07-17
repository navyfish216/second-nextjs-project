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
            {/* <span className={styles.icon__heart} /> {`${likeState.likes}`} */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" 
                 className={likeState.liked ? styles.icon__liked : styles.icon} viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
            </svg>
            <span className={styles.span__likes}>
            {`${likeState.likes}`}
            </span>
            {/* {likeState.liked ? "🤍" : "❤️"} {`${likeState.likes}`} */}
          </button>
        </div>
    </div>
  );
}
