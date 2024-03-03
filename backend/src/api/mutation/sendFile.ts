import { uploadContent } from "@dataAccess/s3";
import { encodeGlobalID } from "@pothos/plugin-relay";
import { isValidContentType } from "@shared/file";
import filenamify from "filenamify";
import { GraphQLError } from "graphql";

import { builder } from "../builder";

const SendFileInput = builder.inputType("SendFileInput", {
  description: "The input of the sendFile mutation.",
  fields: (t) => ({
    file: t.field({
      type: "Byte",
      description: "The file to send to the server.",
      required: true,
    }),
    name: t.string({
      description: "The name of the file.",
      required: true,
    }),
    contentType: t.string({
      description: "The content type of the file.",
      required: true,
    }),
  }),
});

class SendFilePayload {
  key: string;

  constructor(key: string) {
    this.key = key;
  }
}

builder.objectType(SendFilePayload, {
  name: "SendFilePayload",
  description: "The payload of the sendFile mutation.",
  fields: (t) => ({
    id: t.globalID({
      description: "The global ID of the file.",
      resolve: (parent) => encodeGlobalID("File", parent.key),
    }),
    key: t.string({
      description: "The key of the file.",
      resolve: (parent) => parent.key,
    }),
  }),
});

builder.mutationFields((t) => ({
  sendFile: t.field({
    type: SendFilePayload,
    description: "Send a file to the server.",
    args: {
      input: t.arg({
        type: SendFileInput,
        description: "The input of the sendFile mutation.",
        required: true,
      }),
    },
    resolve: async (_root, args, context, _info) => {
      // contentTypeの検証
      if (!isValidContentType(args.input.contentType)) {
        throw new GraphQLError(
          `Invalid content type: ${args.input.contentType}`,
        );
      }

      // ファイル名をクリーンにする
      const cleanedName = filenamify(args.input.name);
      const key = `/upload/${cleanedName}`;

      await uploadContent(
        context.s3,
        key,
        args.input.file,
        args.input.contentType,
      );
      console.log("Upload Success!!");

      return new SendFilePayload(key);
    },
  }),
}));
