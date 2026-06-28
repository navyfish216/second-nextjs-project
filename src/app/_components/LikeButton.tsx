"use client";

import { useState } from "react";

export function LikeButton({ id }: { id: string }) {
  const [liked, setLiked] = useState(false);

  return (
    <button
      onClick={() => {
        if (liked) {
          console.log(`LikeButton.id ${id} の「いいね」が外されました`);
        } else {
          console.log(`LikeButton.id ${id} が「いいね」されました`);
        }
        setLiked(!liked);
      }}
    >
      {liked ? "❤️" : "🤍"} いいね
    </button>
  );
}
