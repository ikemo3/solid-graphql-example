import { Input } from "@shared/ui";
import { createSignal } from "solid-js";

export type Props = {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: string;
  id?: string;
};

export const ColorWithText = (props: Props) => {
  const [value, setValue] = createSignal(props.defaultValue ?? "#000000");

  return (
    <>
      <Input
        type="color"
        id={props.id}
        data-testid="color"
        value={value()}
        onInput={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
      <Input
        type="text"
        value={value()}
        onInput={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
    </>
  );
};
