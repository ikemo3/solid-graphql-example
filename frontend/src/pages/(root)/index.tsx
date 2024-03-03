import { helloQuery } from "@shared/api";
import { AlertDialogContext } from "@shared/lib";
import { Button, Input, Label } from "@shared/ui";
import { Title } from "@solidjs/meta";
import { DarkModeInput } from "@widgets/DarkModeInput";
import { RandomNumber } from "@widgets/RandomNumber";
import { StarList } from "@widgets/StarList";
import { useContext } from "solid-js";

const Home = () => {
  const context = useContext(AlertDialogContext);

  let nameField: HTMLInputElement;
  const hello = async () => {
    const result = await helloQuery(nameField.value);
    context.alert(result.data?.hello ?? "Error");
  };

  return (
    <>
      <Title>Vite + Solid + TS</Title>
      <div class="w-full max-w-md">
        <h1 class="text-center text-3xl font-semibold">
          Welcome to My Website
        </h1>
        <p class="mt-4 text-center">
          This is a simple, clean, and beautiful website.
        </p>
        <p class="mt-4">
          <Label for="small-input">Name</Label>
          <Input
            ref={nameField!}
            id="small-input"
            placeholder="Name"
            data-1p-ignore
          />
        </p>
        <p class="mt-4 flex justify-center">
          <Button size="sm" onClick={hello}>
            Hello
          </Button>
        </p>
        <p class="my-4 text-center">
          <DarkModeInput />
        </p>
        <StarList />
      </div>

      <div class="mt-4 w-full max-w-md md:mt-0">
        <h1 class="text-center text-3xl font-semibold">Second Pane</h1>
        <p class="mt-4 text-center">This is the second pane.</p>
        <RandomNumber />
      </div>
    </>
  );
};

export default Home;
