import { builder } from "../builder";

builder.subscriptionFields((t) => ({
  randomNumber: t.float({
    description: "A random number subscription",
    subscribe: (_root, _args, context) =>
      context.pubsub.subscribe("randomNumber"),
    resolve: (payload) => payload,
  }),
}));
