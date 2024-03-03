import { AuthContext } from "@shared/lib";
import { ParentComponent, useContext } from "solid-js";

export const Menu: ParentComponent = (props) => {
  const { logout } = useContext(AuthContext);

  return (
    <div class="h-full w-64 rounded-lg bg-background text-foreground shadow-md">
      <div class="px-6 py-4">
        <h2 class="text-2xl font-semibold">Menu</h2>
        {props.children}
        <ul class="mt-6">
          <li class="mb-2">
            <button
              class="hover:text-foreground/60"
              onClick={logout(window.location.origin)}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
