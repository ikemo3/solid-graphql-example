import { ColorWithText } from "@features/ColorWithText";
import { fireEvent, render, screen } from "@solidjs/testing-library";

describe("ColorWithText", () => {
  test("colorを選択すると、textにも反映される", () => {
    render(() => <ColorWithText id="color" />);

    const colorInput: HTMLInputElement = screen.getByTestId("color");
    const textInput: HTMLInputElement = screen.getByRole("textbox");

    // colorを選択すると、textにも反映される
    fireEvent.input(colorInput, { target: { value: "#ff0000" } });
    expect(textInput.value).toBe("#ff0000");
  });

  test("textを入力すると、colorにも反映される", () => {
    render(() => <ColorWithText id="color" />);

    const colorInput: HTMLInputElement = screen.getByTestId("color");
    const textInput: HTMLInputElement = screen.getByRole("textbox");

    // textを入力すると、colorにも反映される
    fireEvent.input(textInput, { target: { value: "#00ff00" } });
    expect(colorInput.value).toBe("#00ff00");
  });

  test("defaultValueが指定されている場合、初期値が設定される", () => {
    render(() => <ColorWithText id="color" defaultValue="#0000ff" />);

    const colorInput: HTMLInputElement = screen.getByTestId("color");
    const textInput: HTMLInputElement = screen.getByRole("textbox");

    expect(colorInput.value).toBe("#0000ff");
    expect(textInput.value).toBe("#0000ff");
  });
});
