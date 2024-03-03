import { Input } from "@shared/ui";
import { createSignal } from "solid-js";

export type Props = {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  id?: string;
};

export const RangeWithNumber = (props: Props) => {
  const [value, setValue] = createSignal(props.defaultValue ?? 0);

  return (
    <>
      <Input
        type="range"
        id={props.id}
        min={props.min}
        max={props.max}
        step={props.step}
        value={value()}
        onInput={(e) => {
          setValue(e.currentTarget.valueAsNumber);
        }}
      />
      <Input
        type="number"
        min={props.min}
        max={props.max}
        step={props.step}
        value={value()}
        onInput={(e) => {
          setValue(e.currentTarget.valueAsNumber);
        }}
      />
    </>
  );
};
