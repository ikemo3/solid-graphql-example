import {
  Auth0Client,
  AuthenticationError,
  createAuth0Client,
  User as Auth0User,
} from "@auth0/auth0-spa-js";
import { AuthClient, initializeAuthClient } from "@shared/api";
import { AuthContext, AuthResult } from "@shared/lib";
import { ParentComponent } from "solid-js";
import { createStore } from "solid-js/store";

/**
 * Auth0クライアント
 */
const auth0Client = await createAuth0Client({
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_OAUTH2_CLIENT_ID,
  authorizationParams: {
    audience: import.meta.env.VITE_OAUTH2_AUDIENCE,
    scope: "openid profile email",
    redirect_uri: window.location.origin + "/login",
  },
  cacheLocation: "localstorage",
});

// Auth0クライアントを使用して、AuthClientを作成する
function createAuthClient(auth0Client: Auth0Client): AuthClient {
  return {
    getAccessToken: async () => {
      return await auth0Client.getTokenSilently();
    },
  };
}
const authClient: AuthClient = createAuthClient(auth0Client);

initializeAuthClient(authClient);

type EmptyUser = {
  isValid: false;
};

type ValidUser = {
  isValid: true;
  user: Auth0User;
};

export const [user, setUser] = createStore<EmptyUser | ValidUser>({
  isValid: false,
});

async function handleRedirectCallback(): Promise<AuthResult> {
  try {
    // 応答を処理する
    await auth0Client.handleRedirectCallback();

    // ユーザー情報を取得する
    const user = (await auth0Client.getUser()) ?? null;

    // ユーザー情報をセットする
    if (user) {
      setUser({ isValid: true, user });
      return { success: true };
    } else {
      setUser({ isValid: false });
      return {
        success: false,
        error: "user_not_found",
        error_description: "User not found",
      };
    }
  } catch (err) {
    // AuthenticationErrorクラスの場合は、レスポンスのエラーを処理する
    if (err instanceof AuthenticationError) {
      console.log(err.error_description);
      return {
        success: false,
        error: err.error,
        error_description: err.error_description,
      };
    }

    console.error("エラーが発生しました。", err);
    return {
      success: false,
      error: "unknown_error",
      error_description: "An unknown error occurred",
    };
  }
}

const AnonymousUser = {
  name: "Anonymous User",
  picture: "",
};

export const AuthProvider: ParentComponent = (props) => {
  const isAuthenticated = () => auth0Client.isAuthenticated();
  const login = () => auth0Client.loginWithRedirect();
  const logout = (returnTo: string) => {
    return () =>
      auth0Client.logout({
        logoutParams: {
          returnTo,
        },
      });
  };
  const user = async () => {
    const user = await auth0Client.getUser();
    if (!user) {
      return AnonymousUser;
    }

    return {
      name: user.name ?? AnonymousUser.name,
      picture: user.picture ?? AnonymousUser.picture,
    };
  };

  return (
    <AuthContext.Provider
      value={{ handleRedirectCallback, isAuthenticated, login, logout, user }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
