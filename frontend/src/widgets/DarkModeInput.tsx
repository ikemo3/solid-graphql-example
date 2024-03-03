import { DarkModeContext } from "@shared/lib";
import {
  Label,
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemLabel,
} from "@shared/ui";
import { For, ParentComponent, useContext } from "solid-js";

export const DarkModeInput: ParentComponent = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <div class="flex space-x-2">
      <div class="grid gap-1.5 leading-none">
        <Label for="dark-mode-input">Dark Mode</Label>
        <RadioGroup
          id="dark-mode"
          defaultValue={darkMode()}
          onChange={setDarkMode}
        >
          <For each={["system", "light", "dark"]}>
            {(darkMode) => (
              <RadioGroupItem value={darkMode}>
                <RadioGroupItemLabel>{darkMode}</RadioGroupItemLabel>
              </RadioGroupItem>
            )}
          </For>
        </RadioGroup>
      </div>
    </div>
  );
};
