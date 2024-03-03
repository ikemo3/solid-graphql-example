import { encodeGlobalID } from "@pothos/plugin-relay";

import { builder } from "../builder";

const SendDateInput = builder.inputType("SendDateInput", {
  description: "The input of the sendDate mutation.",
  fields: (t) => ({
    date: t.field({
      type: "DateTime",
      description: "The date to send to the server.",
      required: true,
    }),
  }),
});

class SendDatePayload {
  date: Date;

  constructor(date: Date) {
    this.date = date;
  }
}

builder.objectType(SendDatePayload, {
  name: "SendDatePayload",
  description: "The payload of the sendDate mutation.",
  fields: (t) => ({
    id: t.globalID({
      description: "The global ID of the date.",
      resolve: (parent) => encodeGlobalID("Date", parent.date.toISOString()),
    }),
    date: t.field({
      type: "DateTime",
      description: "The date.",
      resolve: (parent) => parent.date,
    }),
  }),
});

builder.mutationFields((t) => ({
  sendDate: t.field({
    type: SendDatePayload,
    description: "Send a date to the server.",
    args: {
      input: t.arg({
        type: SendDateInput,
        description: "The input of the sendDate mutation.",
        required: true,
      }),
    },
    resolve: (_root, args, _context, _info) => {
      console.log(args.input.date instanceof Date);
      return new SendDatePayload(args.input.date);
    },
  }),
}));
