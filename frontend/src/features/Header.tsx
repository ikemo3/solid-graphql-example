import { A } from "@router";
import { useLocation } from "@solidjs/router";
import {
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  ParentComponent,
} from "solid-js";

export const Header: ParentComponent = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [menuIconRef, setMenuIconRef] = createSignal<HTMLDivElement | null>(
    null,
  );
  const [menuRef, setMenuRef] = createSignal<HTMLDivElement | null>(null);
  const location = useLocation();

  // ルーティングの変更を監視してメニューを閉じる
  createEffect(() => {
    location.pathname; // これがないとルーティングの変更を監視できない
    setIsOpen(false);
  });

  const handleDocumentClick = (e: MouseEvent) => {
    // もし初期化されていない場合はreturn
    const menu = menuRef();
    const menuIcon = menuIconRef();
    if (!menu || !menuIcon) {
      return;
    }

    // e.targetがNode型でない場合はreturn
    if (!(e.target instanceof Node)) {
      return;
    }

    // クリックされた場所がメニュー内かメニューアイコン内でない場合はメニューを閉じる
    if (!menu.contains(e.target) && !menuIcon.contains(e.target)) {
      setIsOpen(false);
    }
  };

  onMount(() => {
    document.addEventListener("click", handleDocumentClick);
  });

  onCleanup(() => {
    document.removeEventListener("click", handleDocumentClick);
  });

  return (
    <>
      <header class="flex items-center justify-between bg-primary px-4 py-2 text-primary-foreground shadow">
        <div class="text-xl font-semibold hover:cursor-pointer">
          <A href="/">My Boilerplate</A>
        </div>
        <div ref={setMenuIconRef} class="flex items-center space-x-4">
          <MenuIcon
            class="size-6 hover:cursor-pointer"
            onClick={() => setIsOpen(!isOpen())}
          />
        </div>
        <div
          ref={setMenuRef}
          class={
            isOpen()
              ? "fixed right-0 top-11 z-40 translate-x-0 transition-transform duration-200 ease-in-out"
              : "fixed right-0 top-11 z-40 translate-x-full transition-transform duration-200 ease-in-out"
          }
        >
          {props.children}
        </div>
      </header>
    </>
  );
};

const MenuIcon = (props: { class: string; onClick: () => void }) => {
  return (
    <svg
      class={props.class}
      onClick={() => props.onClick()}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
};
