export async function postLike(photoId: string) {
  await fetch(`/api/photos/${photoId}/like`, {
    method: "POST"
  });
}
