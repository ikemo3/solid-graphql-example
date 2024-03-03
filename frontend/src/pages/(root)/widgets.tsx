import { ColorWithText } from "@features/ColorWithText";
import { RangeWithNumber } from "@features/RangeWithNumber";
import { Button, Checkbox, Input, Label, showToast } from "@shared/ui";
import { Title } from "@solidjs/meta";
import { DarkModeInput } from "@widgets/DarkModeInput";
import { FruitCombobox } from "@widgets/FruitCombobox";

const Widgets = () => {
  return (
    <>
      <Title>Widgets</Title>
      <form onSubmit={(e) => e.preventDefault()}>
        <div class="flex flex-col space-y-4">
          <DarkModeInput />
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="destructive">Destructive Button</Button>
          <Button variant="link">Link Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button size="sm">Small Size</Button>
          <Button size="default">Default Size</Button>
          <Button size="lg">Large Size</Button>
          <Button size="icon">Icon Size</Button>

          <div class="flex space-x-2">
            <Checkbox />
            <div class="grid gap-1.5 leading-none">Checkbox</div>
          </div>

          <div>
            <Label for="text-input">Text</Label>
            <Input type="text" placeholder="Text" id="text-input" />
          </div>

          <div>
            <Label for="number-input">Number</Label>
            <Input type="number" placeholder="Number" id="number-input" />
          </div>

          <div>
            <Label for="password-input">Password</Label>
            <Input
              type="password"
              placeholder="Password"
              autocomplete="current-password"
              id="password-input"
            />
          </div>

          <div>
            <Label for="email-input">Email</Label>
            <Input
              type="email"
              placeholder="Email"
              autocomplete="email"
              id="email-input"
            />
          </div>

          <div>
            <Label for="tel-input">Tel</Label>
            <Input type="tel" placeholder="Tel" id="tel-input" />
          </div>

          <div>
            <Label for="url-input">URL</Label>
            <Input type="url" placeholder="URL" id="url-input" />
          </div>

          <div>
            <Label for="search-input">Search</Label>
            <Input type="search" placeholder="Search" id="search-input" />
          </div>

          <div>
            <Label for="date-input">Date</Label>
            <Input type="date" placeholder="Date" id="date-input" />
          </div>

          <div>
            <Label for="time-input">Time</Label>
            <Input type="time" placeholder="Time" id="time-input" />
          </div>

          <div>
            <Label for="datetime-local-input">Datetime Local</Label>
            <Input
              type="datetime-local"
              placeholder="Datetime Local"
              id="datetime-local-input"
            />
          </div>

          <div>
            <Label for="month-input">Month</Label>
            <Input type="month" placeholder="Month" id="month-input" />
          </div>

          <div>
            <Label for="week-input">Week(Safari, Firefox未対応)</Label>
            <Input type="week" placeholder="Week" id="week-input" />
          </div>

          <div>
            <Label for="range-input">Range</Label>
            <Input type="range" placeholder="Range" id="range-input" />
          </div>

          <div>
            <Label for="range-with-number-input">Range with number</Label>
            <RangeWithNumber
              min={0}
              max={100}
              step={2}
              defaultValue={30}
              id="range-with-number-input"
            />
          </div>

          <div>
            <Label for="color-with-text-input">Color with text</Label>
            <ColorWithText defaultValue="#ff0000" id="color-with-text-input" />
          </div>

          <div>
            <Label for="file-input">File</Label>
            <Input type="file" placeholder="File" id="file-input" />
          </div>

          <div class="flex">
            <Checkbox id="small" />
            <Label class="mx-2" for="small-input">
              Small Input
            </Label>
          </div>

          <FruitCombobox />

          <div class="gap-2">
            <Button
              onClick={() =>
                showToast({
                  title: "Event has been created",
                  description: "Monday, January 3rd at 6:00pm",
                })
              }
            >
              Add Event
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                showToast({
                  title: "Event has been deleted",
                  description: "Monday, January 3rd at 6:00pm",
                  variant: "destructive",
                })
              }
            >
              Delete Event
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Widgets;
