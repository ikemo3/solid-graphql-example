import { getSignedUrl, listObjects } from "@dataAccess/s3";

import { builder } from "../builder";

builder.queryFields((t) => ({
  listFiles: t.field({
    type: ["String"],
    description: "List all files in the server.",
    resolve: async (_root, _args, context, _info) => {
      return await listObjects(context.s3, "/upload/");
    },
  }),
  fileUrl: t.string({
    description: "Get the URL of a file from the server.",
    args: {
      key: t.arg({
        type: "String",
        description: "The key of the file.",
        required: true,
      }),
    },
    resolve: async (_root, args, context, _info) => {
      const key = args.key;

      // 署名付きURLの取得
      const url = await getSignedUrl(context.s3, key);

      return url;
    },
  }),
}));
