import { useNavigate } from "@router";
import { AuthContext } from "@shared/lib";
import { Callout } from "@shared/ui";
import { LoginButton } from "@widgets/LoginButton";
import { createSignal, onMount, useContext } from "solid-js";

enum AuthStatus {
  Checking = "checking",
  NotAuthenticated = "notAuthenticated",
  Authenticated = "authenticated",
}

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, handleRedirectCallback } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = createSignal<string>("");

  // 認証状態を管理する
  const [authStatus, setAuthStatus] = createSignal<AuthStatus>(
    AuthStatus.Checking,
  );

  const redirectToHome = () => {
    setTimeout(() => navigate("/"), 200);
  };

  onMount(async () => {
    // 認証済みの場合は、ホームページにリダイレクトする
    if (await isAuthenticated()) {
      setAuthStatus(AuthStatus.Authenticated);
      redirectToHome();
      return;
    }

    // URLにquery stringがない場合は、何もしない
    if (!window.location.search) {
      setAuthStatus(AuthStatus.NotAuthenticated);
      return;
    }

    try {
      // query stringがある場合は、応答を処理する
      const result = await handleRedirectCallback();
      if (result.success) {
        // 認証が成功した場合は、ホームページにリダイレクトする
        setAuthStatus(AuthStatus.Authenticated);
        redirectToHome();
        return;
      } else {
        // 認証が失敗した場合は、エラーメッセージを表示する
        setErrorMessage(`エラー: ${result.error_description}`);
      }
    } finally {
      // query stringを削除する
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // 認証が失敗した場合は、ログインボタンを表示する
    setAuthStatus(AuthStatus.NotAuthenticated);
  });

  return (
    <main class="mx-4 flex h-screen flex-1 flex-col items-center justify-center md:flex-row md:justify-center">
      {authStatus() === AuthStatus.NotAuthenticated && (
        <div class="w-full max-w-md">
          <h1 class="text-center text-3xl font-semibold">Login with Auth0</h1>
          <form class="mt-4 space-y-4">
            <LoginButton />
          </form>
          {errorMessage() && (
            <Callout class="mt-4" variant="error">
              {errorMessage()}
            </Callout>
          )}
        </div>
      )}
      {authStatus() === AuthStatus.Checking && (
        <div class="w-full max-w-md">
          <h1 class="text-center text-3xl font-semibold">Checking...</h1>
        </div>
      )}
      {authStatus() === AuthStatus.Authenticated && (
        <div class="w-full max-w-md">
          <h1 class="text-center text-3xl font-semibold">Redirecting...</h1>
        </div>
      )}
    </main>
  );
};

export default Login;
