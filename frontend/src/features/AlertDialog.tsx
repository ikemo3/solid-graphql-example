import { AlertDialogContext } from "@shared/lib";
import {
  AlertDialog as Dialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@shared/ui";
import { useContext } from "solid-js";

export const AlertDialog = () => {
  const { message, isOpen, close } = useContext(AlertDialogContext);

  return (
    <Dialog open={isOpen()} onOpenChange={() => close()}>
      <AlertDialogContent class="left-[calc(50%-0.5rem)] mx-2 w-[calc(100%-1rem)]">
        <AlertDialogTitle>Modal</AlertDialogTitle>
        <AlertDialogDescription>{message()}</AlertDialogDescription>
      </AlertDialogContent>
    </Dialog>
  );
};
