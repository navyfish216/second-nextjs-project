"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./style.module.css";
import { IconButton } from "./IconButton";

function getAriaCurrent(flag: boolean) {
  //console.log(`getAriaCurrent:flag ${flag}`);
  return flag ? { "aria-current": "page" as const } : undefined;
}

const openModal = () => {
  console.log(`Nav.openModal`);
};

export function Nav() {
  const pathName = usePathname();
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          {/* <Link href="/"> */}
          <Link href="/" {...getAriaCurrent(pathName === "/")}>
            トップ
          </Link>
        </li>
        <li>
          {/* <Link href="/categories"> */}
          <Link
            href="/categories"
            {...getAriaCurrent(pathName.startsWith("/categories"))}
          >
            カテゴリー一覧
          </Link>
        </li>
      </ul>
      <IconButton onClickFunction={openModal}>写真を投稿する</IconButton>
    </nav>
  );
}
