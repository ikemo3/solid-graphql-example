import { ErrorMessages } from "@features/ErrorMessages";
import { createForm } from "@felte/solid";
import { validator } from "@felte/validator-zod";
import { sendDateMutation } from "@shared/api";
import { AlertDialogContext, z } from "@shared/lib";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectHiddenSelect,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui";
import { Title } from "@solidjs/meta";
import { useContext } from "solid-js";

type TimeZone = {
  value: string;
  label: string;
  disabled: boolean;
};

const options: TimeZone[] = [
  { value: "09:00", label: "Asia/Tokyo", disabled: false },
  { value: "00:00", label: "UTC", disabled: false },
];

const schema = z.object({
  date: z
    .string()
    .regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, "正しい日付を入力してください"),
  time: z.string().regex(/^[0-9]{2}:[0-9]{2}$/, "正しい時間を入力してください"),
  timezone: z.string().min(1, "タイムゾーンを選択してください"),
});

type Data = {
  date: string;
  time: string;
  timezone: string;
};

const DateTimePage = () => {
  const context = useContext(AlertDialogContext);

  const { form, errors, warnings } = createForm<Data>({
    extend: [validator({ schema })],
    onSubmit: async (values) => {
      const date = new Date(
        `${values.date}T${values.time}:00+${values.timezone}`,
      );
      const result = await sendDateMutation(date);
      context.alert(JSON.stringify(result));
    },
  });

  return (
    <div>
      <Title>DateTime</Title>
      <form ref={form}>
        <div class="my-2 flex w-80 flex-col">
          <Label for="date">DateTime</Label>
          <Input type="date" name="date" id="date" data-1p-ignore />
          <ErrorMessages errors={errors().date} warnings={warnings().date} />
        </div>

        <div class="my-2 flex w-80 flex-col">
          <Label for="time">DateTime</Label>
          <Input type="time" name="time" id="time" data-1p-ignore />
          <ErrorMessages errors={errors().time} warnings={warnings().time} />
        </div>

        <div class="my-2 flex w-80 flex-col">
          <Label for="timezone">Timezone</Label>
          <Select
            options={options}
            optionValue="value"
            optionTextValue="label"
            optionDisabled="disabled"
            name="timezone"
            id="timezone"
            itemComponent={(props) => (
              <SelectItem item={props.item}>
                {props.item.rawValue.label}
              </SelectItem>
            )}
          >
            <SelectHiddenSelect />
            <SelectTrigger aria-label="Fruit" class="w-[180px]">
              <SelectValue<TimeZone>>
                {(state) => state.selectedOption().label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent />
          </Select>
          <ErrorMessages
            errors={errors().timezone}
            warnings={warnings().timezone}
          />
        </div>

        <Button type="submit" class="mt-2">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default DateTimePage;
