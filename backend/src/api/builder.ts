import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import RelayPlugin from "@pothos/plugin-relay";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import { ByteResolver, DateTimeResolver } from "graphql-scalars";

import PrismaTypes from "../../prisma/pothos-types";
import { prisma } from "../dataAccess/prisma";
import { AuthScopes, Scalars, UserContext } from "../types";

const builder = new SchemaBuilder<{
  AuthScopes: AuthScopes;
  Context: UserContext;
  PrismaTypes: PrismaTypes;
  Scalars: Scalars;
}>({
  plugins: [PrismaPlugin, ScopeAuthPlugin, RelayPlugin],
  prisma: {
    client: prisma,
    // defaults to false, uses /// comments from prisma schema as descriptions
    // for object types, relations and exposed fields.
    // descriptions can be omitted by setting description to false
    exposeDescriptions: true,
    // use where clause from prismaRelatedConnection for totalCount (will true by default in next major version)
    filterConnectionTotalCount: true,
    // warn when not using a query parameter correctly
    onUnusedQuery: process.env.NODE_ENV === "production" ? null : "warn",
  },
  authScopes: async (context) => ({
    public: !context.sub,
  }),
  relayOptions: {
    // These will become the defaults in the next major version
    clientMutationId: "omit",
    cursorType: "String",
  },
});

builder.queryType({
  description: "Root Query",
});

builder.subscriptionType({
  description: "Root Subscription",
});

builder.mutationType({
  description: "Root Mutation",
});

builder.addScalarType("DateTime", DateTimeResolver);
builder.addScalarType("Byte", ByteResolver);

export { builder };
