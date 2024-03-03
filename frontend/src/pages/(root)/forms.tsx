import { ErrorMessages } from "@features/ErrorMessages";
import { createForm } from "@felte/solid";
import { validator } from "@felte/validator-zod";
import { AlertDialogContext, z } from "@shared/lib";
import { Button, Input, Label } from "@shared/ui";
import { Title } from "@solidjs/meta";
import { useContext } from "solid-js";

const schema = z.object({
  email: z.string().email("正しいメールアドレスを入力してください"),
  password: z.string().min(8, "8文字以上で入力してください"),
});

const warnSchema = z.object({
  password: z.string().refine((value) => (value ? value.length > 8 : true), {
    message: "パスワードはセキュアではありません",
  }),
});

type Data = {
  email: string;
  password: string;
};

const Forms = () => {
  const { alert } = useContext(AlertDialogContext);
  const { form, errors, warnings } = createForm<Data>({
    extend: [
      validator({ schema }),
      validator({ schema: warnSchema, level: "warning" }),
    ],
    onSubmit: (values) => {
      alert(`Form submitted! ${JSON.stringify(values)}`);
    },
  });

  return (
    <div>
      <Title>Forms</Title>
      <form ref={form}>
        <div class="my-2 flex w-80 flex-col">
          <Label for="email">Email</Label>
          <Input
            class="mb-2"
            type="text"
            name="email"
            id="email"
            data-1p-ignore
          />
          <ErrorMessages errors={errors().email} warnings={warnings().email} />
        </div>

        <div class="my-2">
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" data-1p-ignore />
          <ErrorMessages
            errors={errors().password}
            warnings={warnings().password}
          />
        </div>

        <Button type="submit" class="mt-2">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default Forms;
