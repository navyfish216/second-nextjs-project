"use client";

import { useState } from "react";

export function LikeButton({ id }: { id: string }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      console.log(`LikeButton.id ${id} が「いいね」が追加されました`);
    } else {
      console.log(`LikeButton.id ${id} が「いいね」されました`);
      setLiked(!liked);
    }
    setLikes(likes + 1);
  };

  const handleCancelLike = () => {
    if (liked) {
      console.log(`LikeButton.id ${id} の「いいね」が外されました`);
      setLiked(!liked);
      setLikes(0);
    } else {
      console.log(`LikeButton.id ${id} は「いいね」されていません`);
    }
  }

  return (
    <div>
        <div>
          <button onClick={handleLike}>
            {liked ? "❤️" : "🤍"} いいね {likes > 0 && `(${likes})`}
          </button>
        </div>
      {liked &&
        <div>
          <button onClick={handleCancelLike}>
            いいねをやめる
          </button>
        </div>
      }
    </div>
  );
}
