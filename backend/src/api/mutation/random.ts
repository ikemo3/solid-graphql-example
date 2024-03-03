import { builder } from "../builder";

builder.mutationFields((t) => ({
  broadcastRandomNumber: t.boolean({
    description: "Broadcast a random number to all subscribers",
    resolve: (_root, _args, context) => {
      context.pubsub.publish("randomNumber", Math.random());
      return true;
    },
  }),
}));
