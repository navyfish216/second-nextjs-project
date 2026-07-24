export async function postLike(photoId: string, userId: string) {
  await fetch(`http://localhost:8080/api/photos/${photoId}/like`, {
    method: "POST",
    body: JSON.stringify({userId: userId})
  });
}
