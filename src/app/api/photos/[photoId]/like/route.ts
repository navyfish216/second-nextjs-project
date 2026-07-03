import "server-only";

export async function POST(
  _: Request,
  {params}: {params: Promise<{photoId: string}>}
) {
  const id = (await params).photoId;
  const res = await fetch(`http://localhost:8080/api/photos/${id}/like`, {
    method: "POST",
  });
  return res;
}