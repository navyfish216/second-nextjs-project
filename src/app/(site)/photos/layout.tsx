import type { Metadata } from "next";
import styles from "./layout.module.css";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  description: "/photos Segment の Layout で設定された description",
};

// 「/photos」配下で全適用されるレイアウト
export default function Layout({ children }: Props) {
  return <div className={styles.container}>{children}</div>;
}
