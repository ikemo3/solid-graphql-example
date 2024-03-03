import { builder } from "../builder";

builder.queryFields((t) => ({
  hello: t.string({
    description: "A simple type for getting started!",
    args: {
      name: t.arg.string({
        description: "Your name, for a friendly greeting!",
      }),
    },
    resolve: (parent, { name }, context) => {
      console.log(context.sub);
      return `hello, ${name || "World"}`;
    },
  }),
}));
