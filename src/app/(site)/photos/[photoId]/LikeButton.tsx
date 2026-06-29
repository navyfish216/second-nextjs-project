"use client";

import { useState } from "react";

export function LikeButton({ photoId }: { photoId: string }) {
  const [liked, setLiked] = useState(false);

  return (
    <button
      onClick={() => {
        console.log(`photoId ${photoId} が「いいね」されました`);
        setLiked(!liked);
      }}
    >
      {liked ? "❤️" : "🤍"} いいね
    </button>
  );
}
