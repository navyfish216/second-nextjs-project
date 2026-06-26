"use client";

import { useRouter } from "next/navigation";
import { use } from "react";

type Props = {
    params: Promise<{categoryName: string}>;
    searchParams: Promise<{[key: string]: string | string[] | undefined}>;
}

export default function Page({params, searchParams}: Props) {
    const unwrapParams = use(params);
    const unwrapSearchParams = use(searchParams);
    const page = typeof unwrapSearchParams.page === "string" ? unwrapSearchParams.page : "1";
    const router = useRouter();
    return (
        <div>
            <h1>カテゴリー別一覧画面</h1>
            <h2>カテゴリー「{unwrapParams.categoryName}」</h2>
            <p>ページ番号：「{page}」</p>
            <button onClick={() => {router.push("/categories");}}>カテゴリー一覧へ戻る</button>
        </div>
    )
}
