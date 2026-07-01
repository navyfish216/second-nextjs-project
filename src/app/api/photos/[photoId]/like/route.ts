export async function POST(
  _: Request,
  {params}: {params: Promise<{photoId: string}>}
) {
  console.log(`photoId ${(await params).photoId} が「いいね」されました`);
  return Response.json({liked: true});
}