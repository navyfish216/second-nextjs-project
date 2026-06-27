"use client";

export function LikeButton({ photoId }: { photoId: string }) {
    return (
        <button onClick={() => {
            console.log(`photoId ${photoId} が「いいね」されました`);
        }}>
            いいね
        </button>
    );
}
