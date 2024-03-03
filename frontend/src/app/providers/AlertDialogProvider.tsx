import { AlertDialogContext } from "@shared/lib";
import { createSignal, ParentComponent } from "solid-js";

export const AlertDialogProvider: ParentComponent = (props) => {
  const [message, setMessage] = createSignal("");
  const [isOpen, setIsOpen] = createSignal(false);
  const alert = (message: string) => {
    setMessage(message);
    setIsOpen(true);
  };
  const close = () => {
    setMessage("");
    setIsOpen(false);
  };

  return (
    <AlertDialogContext.Provider value={{ alert, message, isOpen, close }}>
      {props.children}
    </AlertDialogContext.Provider>
  );
};
