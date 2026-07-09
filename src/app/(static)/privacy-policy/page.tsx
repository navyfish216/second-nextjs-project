import styles from "../layout.module.css";

type Props = {
  searchParams: Promise<{[key: string]: string | string[] | undefined}>;
}

export default async function Page({searchParams}: Props) {
  
  if (typeof (await searchParams).foo === "string") {
    console.log("privacy-policy.searchParams.foo: string");
  } else {
    console.log("privacy-policy.searchParams.foo: other");
  }

  return (
    <div className={styles.container_sub}>
      <h2>利用規約</h2>
    </div>
  );
}
