import { RangeWithNumber } from "@features/RangeWithNumber";
import { fireEvent, render, screen } from "@solidjs/testing-library";

describe("RangeWithNumber", () => {
  test("defaultValueが指定されている場合、初期値が設定される", () => {
    render(() => <RangeWithNumber defaultValue={50} />);

    const rangeInput: HTMLInputElement = screen.getByRole("slider");
    const numberInput: HTMLInputElement = screen.getByRole("spinbutton");

    expect(rangeInput.value).toBe("50");
    expect(numberInput.value).toBe("50");
  });

  test("rangeを選択すると、numberにも反映される", () => {
    render(() => <RangeWithNumber />);

    const rangeInput: HTMLInputElement = screen.getByRole("slider");
    const numberInput: HTMLInputElement = screen.getByRole("spinbutton");

    // rangeを選択すると、numberにも反映される
    fireEvent.input(rangeInput, { target: { value: "75" } });
    expect(numberInput.value).toBe("75");
  });

  test("numberを入力すると、rangeにも反映される", () => {
    render(() => <RangeWithNumber />);

    const rangeInput: HTMLInputElement = screen.getByRole("slider");
    const numberInput: HTMLInputElement = screen.getByRole("spinbutton");

    // numberを入力すると、rangeにも反映される
    fireEvent.input(numberInput, { target: { value: "25" } });
    expect(rangeInput.value).toBe("25");
  });
});
