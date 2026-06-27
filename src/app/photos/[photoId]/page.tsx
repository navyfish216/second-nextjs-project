//import { use } from "react";
//import { LikeButton } from "./LikeButton";
import { LikeButton } from "../../_components/LikeButton";

type Props = {
  params: Promise<{ photoId: string }>;
};

// ★:props からパスパラメーターが参照できる
export default async function Page({ params }: Props) {
  //const unwrapParams = use(params);
  return (
    <div>
      <h1>写真ID「{(await params).photoId}」の詳細画面</h1>
      <table>
        <tbody>
          <tr>
            <th>概要</th>
            <td>概要テキスト</td>
          </tr>
        </tbody>
      </table>
      <LikeButton id={(await params).photoId} />
    </div>
  );
}
