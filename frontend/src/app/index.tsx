import "./index.css";

if (import.meta.env.DEV) {
  import("solid-devtools");
}

import { AlertDialog } from "@features/AlertDialog";
import { Routes } from "@generouted/solid-router";
import { Toaster } from "@shared/ui";
import { MetaProvider } from "@solidjs/meta";
import { render } from "solid-js/web";

import { AlertDialogProvider } from "./providers/AlertDialogProvider";
import { AuthProvider } from "./providers/AuthProvider";
import { DarkModeProvider } from "./providers/DarkModeProvider";

const root = document.getElementById("root");

render(
  () => (
    <MetaProvider>
      <DarkModeProvider>
        <AlertDialogProvider>
          <AuthProvider>
            <Routes />
            <Toaster />
            <AlertDialog />
          </AuthProvider>
        </AlertDialogProvider>
      </DarkModeProvider>
    </MetaProvider>
  ),
  root!,
);
