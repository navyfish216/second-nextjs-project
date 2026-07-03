"use client";

import { useState } from "react";
import { postLike } from "@/services/postLike";
import type {Like} from "../../services/type";

// async function postLike(id: string) {
//   const data: {liked: boolean} = await fetch(`/api/photos/${id}/like`, {
//     method: "POST",
//   }).then((res) => res.json());
//   return data;
// }

export function LikeButton({ id }: { id: string }) {
  const [likes, setLikes] = useState(0);
  //const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    const data: Like = await postLike(id);
    // const data: {liked: boolean} = await fetch(`/api/photos/${id}/like`, {
    //   method: "POST",
    // }).then((res) => res.json());
    console.log(`photoId ${id} liked: ${data.liked}`);

    if (likes > 0) {
      console.log(`LikeButton.id ${id} が「いいね」が追加されました`);
    } else {
      console.log(`LikeButton.id ${id} が「いいね」されました`);
      //setLiked(!liked);
    }
    setLikes(likes + 1);
  };

  const handleCancelLike = () => {
    if (likes > 0) {
      console.log(`LikeButton.id ${id} の「いいね」が外されました`);
      //setLiked(!liked);
      setLikes(0);
    } else {
      console.log(`LikeButton.id ${id} は「いいね」されていません`);
    }
  }

  return (
    <div>
        <div>
          <button onClick={handleLike}>
            {likes > 0 ? "❤️" : "🤍"} いいね {likes > 0 && `(${likes})`}
          </button>
        </div>
      {likes > 0 &&
        <div>
          <button onClick={handleCancelLike}>
            いいねをやめる
          </button>
        </div>
      }
    </div>
  );
}
