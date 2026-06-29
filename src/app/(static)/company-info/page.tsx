import { cookies } from "next/headers";

export default function Page() {
  const cookieStore = cookies();
  console.log(`company-info.cookieStore: ${cookieStore}`);

  return (
    <div>
      <h1>企業概要</h1>
    </div>
  );
}
