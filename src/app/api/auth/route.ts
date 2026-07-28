import "server-only";

export async function POST(
  request: Request
) {
  const body = await request.json();
  const authToken = body.authToken;
  console.log(`POST authToken: ${authToken}`);

  // 疑似的に固定のユーザーIDを返す
  const responseJson = JSON.stringify({userId: "dummy"});
  console.log(`POST responseJson: ${responseJson}`);

  return Response.json(responseJson);
}