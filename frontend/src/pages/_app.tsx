import { DarkModeContext } from "@shared/lib";
import { Link } from "@solidjs/meta";
import { RouteSectionProps } from "@solidjs/router";
import { AuthGuard } from "@widgets/AuthGuard";
import { Component, useContext } from "solid-js";

const App: Component<RouteSectionProps> = (props) => {
  const { theme } = useContext(DarkModeContext);

  return (
    <>
      <Link rel="icon" href="/favicon.png" />
      <div data-kb-theme={theme()} class="bg-background text-foreground">
        <AuthGuard>{props.children}</AuthGuard>
      </div>
    </>
  );
};

export default App;
