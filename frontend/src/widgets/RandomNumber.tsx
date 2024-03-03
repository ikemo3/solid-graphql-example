import {
  broadcastRandomNumberMutation,
  randomNumberSubscription,
} from "@shared/api";
import { useSubscription } from "@shared/lib";
import { Button } from "@shared/ui";
import { ExecutionResult } from "graphql";
import { createSignal } from "solid-js";

type RandomResult = {
  randomNumber: number;
};

export const RandomNumber = () => {
  let randomNumberText: HTMLParagraphElement;
  const [message, setMessage] = createSignal<string>("");

  const handleSubscribed = () => {
    setMessage("Subscribed");
  };

  const handleEvent = (event: ExecutionResult<RandomResult>) => {
    const randomNumber = event.data?.randomNumber;
    setMessage(`Random Number: ${randomNumber}`);
  };

  const { isSubscribed, subscribe, cancel } = useSubscription<RandomResult>(
    randomNumberSubscription,
    handleSubscribed,
    handleEvent,
  );

  return (
    <div>
      <p class="mt-4 flex justify-center">
        <Button size="sm" onClick={subscribe} disabled={isSubscribed()}>
          Subscribe
        </Button>
        <Button
          class="ml-2"
          size="sm"
          onClick={broadcastRandomNumberMutation}
          disabled={!isSubscribed()}
        >
          Send
        </Button>
        <Button
          class="ml-2"
          size="sm"
          onClick={cancel}
          disabled={!isSubscribed()}
        >
          Cancel
        </Button>
      </p>
      <p class="flex justify-center" ref={randomNumberText!}>
        {!isSubscribed() ? "Not subscribed" : message()}
      </p>
    </div>
  );
};
