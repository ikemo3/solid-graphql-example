import { createContext } from "solid-js";

export type AlertDialogContextType = {
  alert: (message: string) => void;
  isOpen: () => boolean;
  message: () => string;
  close: () => void;
};

export const AlertDialogContext = createContext<AlertDialogContextType>({
  alert: () => {},
  isOpen: () => false,
  message: () => "",
  close: () => {},
});
