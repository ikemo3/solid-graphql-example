import { Footer } from "@features/Footer";
import { Header } from "@features/Header";
import { Menu } from "@features/Menu";
import { A, Path } from "@router";
import { RouteSectionProps } from "@solidjs/router";
import { AuthGuard } from "@widgets/AuthGuard";
import { Profile } from "@widgets/Profile";
import { Component, For } from "solid-js";

const Links: { path: Path; label: string }[] = [
  { path: "/", label: "Home" },
  { path: "/posts", label: "Posts" },
  { path: "/widgets", label: "Widgets" },
  { path: "/forms", label: "Forms" },
  { path: "/upload", label: "Upload" },
  { path: "/dnd", label: "Drag and Drop" },
  { path: "/datetime", label: "DateTime" },
  { path: "/clipboard", label: "Clipboard" },
];

const Layout: Component<RouteSectionProps> = (props) => {
  return (
    <AuthGuard>
      <div class="flex min-h-screen flex-col">
        <Header>
          <Menu>
            <Profile />
            <ul class="mt-6">
              <For each={Links}>
                {(link) => (
                  <li class="mb-2">
                    <A class="hover:text-foreground/60" href={link.path}>
                      {link.label}
                    </A>
                  </li>
                )}
              </For>
            </ul>
          </Menu>
        </Header>
        <main class="m-4 flex flex-1 flex-col items-center justify-center md:flex-row">
          {props.children}
        </main>
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default Layout;
