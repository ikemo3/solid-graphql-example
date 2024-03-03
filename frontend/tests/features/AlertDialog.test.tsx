import { AlertDialog } from "@features/AlertDialog";
import { AlertDialogContext, AlertDialogContextType } from "@shared/lib";
import { render, screen } from "@solidjs/testing-library";
import { ParentComponent } from "solid-js";

type ProviderProps = {
  initialIsOpen: boolean;
  initialMessage?: string;
  initialClose?: () => void;
};

const Provider: ParentComponent<ProviderProps> = (props) => {
  const value = {
    isOpen: () => props.initialIsOpen,
    message: () => props.initialMessage ?? "",
    close: props.initialClose ?? vi.fn(),
  } as unknown as AlertDialogContextType;

  return (
    <AlertDialogContext.Provider value={value}>
      {props.children}
    </AlertDialogContext.Provider>
  );
};

describe("AlertDialog", () => {
  test("isOpen が false の場合、ダイアログが表示されないこと", async () => {
    render(() => (
      <Provider initialIsOpen={false}>
        <AlertDialog />
      </Provider>
    ));

    const dialog = screen.queryByTestId("alert-dialog");
    expect(dialog).not.toBeInTheDocument();
  });

  test("isOpen が true の場合、ダイアログとメッセージが表示されること", async () => {
    render(() => (
      <Provider initialIsOpen={true} initialMessage="Hello">
        <AlertDialog />
      </Provider>
    ));

    const dialog = await screen.findByTestId("alert-dialog");
    expect(dialog).toBeInTheDocument();

    const message = screen.getByText("Hello");
    expect(message).toBeInTheDocument();
  });

  test("close ボタンを押すと close が呼ばれること", async () => {
    const closeMock = vi.fn();
    render(() => (
      <Provider initialIsOpen={true} initialClose={closeMock}>
        <AlertDialog />
      </Provider>
    ));

    const dialog = await screen.findByTestId("alert-dialog");
    expect(dialog).toBeInTheDocument();

    const closeButton = screen.getByRole("button");
    closeButton.click();

    // close が呼ばれることを確認
    expect(closeMock).toHaveBeenCalled();
  });
});
