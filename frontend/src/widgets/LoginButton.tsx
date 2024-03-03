import { AuthContext } from "@shared/lib";
import { Button } from "@shared/ui";
import { useContext } from "solid-js";

export const LoginButton = () => {
  const { login } = useContext(AuthContext);

  return (
    <Button class="w-full rounded-md px-4 py-2 text-lg" onClick={login}>
      Login
    </Button>
  );
};
