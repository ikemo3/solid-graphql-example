import { builder } from "../builder";

builder.prismaObject("Constellation", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    stars: t.relation("stars", {
      query: (_args, _context) => ({
        orderBy: {
          id: "asc",
        },
      }),
    }),
    createdAt: t.expose("createdAt", {
      type: "DateTime",
    }),
    updatedAt: t.expose("updatedAt", {
      type: "DateTime",
    }),
  }),
});

builder.prismaObject("Star", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    constellation: t.relation("constellation"),
    createdAt: t.expose("createdAt", {
      type: "DateTime",
    }),
    updatedAt: t.expose("updatedAt", {
      type: "DateTime",
    }),
  }),
});
