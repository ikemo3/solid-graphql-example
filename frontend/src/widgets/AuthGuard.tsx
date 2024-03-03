import { useNavigate } from "@router";
import { AuthContext } from "@shared/lib";
import { onMount, ParentComponent, useContext } from "solid-js";

/**
 * 認証ガードコンポーネント
 *
 * @param props - 親コンポーネントから渡されるプロパティ
 * @returns 子コンポーネントを表示する
 */
export const AuthGuard: ParentComponent = (props) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  // マウント時に認証済みかどうかを確認する
  onMount(async () => {
    const alreadyAuthenticated = await isAuthenticated();

    // 認証済みでない場合は、ログインページにリダイレクトする
    if (!alreadyAuthenticated) {
      navigate("/login");
    }
  });

  return <>{props.children}</>;
};
