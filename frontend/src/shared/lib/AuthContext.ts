import { createContext } from "solid-js";

type SuccessResult = {
  success: true;
};

type ErrorResult = {
  success: false;
  error: string;
  error_description: string;
};

export type AuthResult = SuccessResult | ErrorResult;

export type User = {
  name: string;
  picture: string;
};

export type AuthContextType = {
  handleRedirectCallback: () => Promise<AuthResult>;
  isAuthenticated: () => Promise<boolean>;
  user: () => Promise<User>;
  login: () => void;
  logout: (returnTo: string) => () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  handleRedirectCallback: async () => ({
    success: false,
    error: "not implemented",
    error_description: "not implemented",
  }),
  isAuthenticated: async () => false,
  user: async () => ({
    name: "not implemented",
    picture: "not implemented",
  }),
  login: () => {},
  logout: () => async () => {},
});
