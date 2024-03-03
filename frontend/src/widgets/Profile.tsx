import { AuthContext } from "@shared/lib";
import { Avatar, AvatarFallback, AvatarImage } from "@shared/ui";
import initials from "initials";
import { createResource, Show, useContext } from "solid-js";

export const Profile = () => {
  const { user: userFetcher } = useContext(AuthContext);
  const [user] = createResource(userFetcher);

  return (
    <Show when={user()} fallback={<p>Loading...</p>}>
      {(user) => (
        <p class="mt-2">
          <Avatar>
            <AvatarImage src={user().picture} />
            <AvatarFallback>{initials(user().name)}</AvatarFallback>
          </Avatar>
        </p>
      )}
    </Show>
  );
};
