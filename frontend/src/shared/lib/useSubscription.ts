import { SubscriptionResult } from "@shared/api";
import { ExecutionResult } from "graphql";
import { createSignal } from "solid-js";

export function useSubscription<TResult>(
  startSubscription: () => Promise<SubscriptionResult<TResult>>,
  handleSubscribed: () => void,
  handleEvent: (event: ExecutionResult<TResult>) => void,
) {
  const [subscription, setSubscription] =
    createSignal<SubscriptionResult<TResult>>();
  const isSubscribed = () => !!subscription();

  const cancel = () => {
    const currentSubscription = subscription();
    if (currentSubscription) {
      // サブスクリプションがキャンセル可能かチェック
      if (!currentSubscription.return) {
        throw new Error("return is not defined");
      }

      // イテレーターを終了することでサブスクリプションをキャンセル
      // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Generator/return
      currentSubscription.return();
      setSubscription(); // イテレーター参照をクリア
    }
  };

  const subscribe = async () => {
    // すでにサブスクリプションが開始されている場合は何もしない
    if (subscription()) {
      return;
    }

    // サブスクリプションを開始
    const sub = await startSubscription();
    setSubscription(sub);
    handleSubscribed();

    // サブスクリプションの結果を受け取る
    for await (const event of sub) {
      handleEvent(event);
    }
  };

  return {
    isSubscribed,
    subscribe,
    cancel,
  };
}
