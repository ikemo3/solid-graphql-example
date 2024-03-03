import { DarkModeContext, DarkModeContextType } from "@shared/lib";
import { render, screen } from "@solidjs/testing-library";
import { DarkModeInput } from "@widgets/DarkModeInput";
import { createSignal, ParentComponent } from "solid-js";

type ProviderProps = {
  onDarkModeChange?: (mode: string) => void;
};

const Provider: ParentComponent<ProviderProps> = (props) => {
  const [darkMode, setDarkMode] = createSignal("system");

  // setDarkModeをラップして、コールバックを実行
  const setDarkModeWithCallback = (mode: string) => {
    setDarkMode(mode);
    props.onDarkModeChange?.(mode);
  };

  const value = {
    darkMode,
    setDarkMode: setDarkModeWithCallback,
  } as unknown as DarkModeContextType;

  return (
    <DarkModeContext.Provider value={value}>
      {props.children}
    </DarkModeContext.Provider>
  );
};

describe("DarkModeInput", () => {
  test("デフォルトがsystemモードであること", () => {
    render(() => (
      <Provider>
        <DarkModeInput />
      </Provider>
    ));

    const darkModeInput: HTMLInputElement = screen.getByLabelText("dark");
    expect(darkModeInput.checked).toBe(false);

    const lightModeInput: HTMLInputElement = screen.getByLabelText("light");
    expect(lightModeInput.checked).toBe(false);

    const systemModeInput: HTMLInputElement = screen.getByLabelText("system");
    expect(systemModeInput.checked).toBe(true);
  });

  test("darkモードが選択された場合、ダークモードが有効になること", () => {
    const onDarkModeChangeMock = vi.fn();

    render(() => (
      <Provider onDarkModeChange={onDarkModeChangeMock}>
        <DarkModeInput />
      </Provider>
    ));

    // darkを選択
    const darkModeInput: HTMLInputElement = screen.getByLabelText("dark");
    darkModeInput.click();

    // onDarkModeChangeコールバックが期待通りに呼び出されたかを検証
    expect(onDarkModeChangeMock).toHaveBeenCalledWith("dark");
  });
});
