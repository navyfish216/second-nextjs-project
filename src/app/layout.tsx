import "../styles/globals.css";
import type { Metadata } from "next";
import { SITE_NAME } from "@/constants";

export const metadata:Metadata = {
  title: SITE_NAME,
  description:
    "(root)「Photo Share」は、ユーザーが自由に写真を共有し、コメントや「いいね」を通じて交流することができるSNSアプリケーションです。",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
