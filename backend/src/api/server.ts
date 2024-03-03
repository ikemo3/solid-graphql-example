import { EnvelopArmor } from "@escape.tech/graphql-armor";
import { useDisableIntrospection } from "@graphql-yoga/plugin-disable-introspection";
import { GraphQLSchema } from "graphql";
import { createYoga, PubSub } from "graphql-yoga";

import { PubSubChannel, S3Context, ServerContext, UserContext } from "../types";

export function createGraphQLServer(
  schema: GraphQLSchema,
  s3: S3Context,
  pubsub: PubSub<PubSubChannel>,
) {
  // 開発環境かどうか
  const isDevelopment = process.env.NODE_ENV === "production";

  // GraphQLの設定
  const armor = new EnvelopArmor();
  const protection = armor.protect();

  const yoga = createYoga<ServerContext, UserContext>({
    graphiql: isDevelopment,
    plugins: [
      ...protection.plugins,
      useDisableIntrospection({
        isDisabled: () => !isDevelopment,
      }),
    ],
    schema,
    context: async (initialContext) => {
      // 認証情報の取得
      const sub = initialContext.req?.auth?.payload.sub ?? "";
      return {
        sub,
        s3,
        pubsub,
      };
    },
  });

  return yoga;
}
