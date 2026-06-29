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
    <div>
      <h1>利用規約</h1>
    </div>
  );
}
