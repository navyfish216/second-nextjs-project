import "server-only";

export async function POST(
  request: Request,
  {params}: {params: Promise<{photoId: string}>}
) {
  const photoId = (await params).photoId;
  const body = await request.json();
  console.log(`POST JSON.stringify(body): ${JSON.stringify(body)}`);

  const res = await fetch(`http://localhost:8080/api/photos/${photoId}/like`, {
    method: "POST",
    body: JSON.stringify(body)
  });
  return res;
}