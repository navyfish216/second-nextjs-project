import { cookies } from "next/headers";
import styles from "../layout.module.css";

export default function Page() {
  //const cookieStore = cookies();
  //console.log(`company-info.cookieStore: ${cookieStore}`);

  return (
    <div className={styles.container_sub}>
      <h2>企業概要</h2>
    </div>
  );
}
