import {
  queryConstellationByIdOrThrow,
  queryConstellationList,
  queryStarByIdOrThrow,
  queryStarList,
} from "@dataAccess/star";

import { builder } from "../builder";

builder.queryFields((t) => ({
  stars: t.prismaField({
    description: "Returns a list of stars",
    type: ["Star"],
    resolve: () => queryStarList(),
  }),

  star: t.prismaField({
    description: "Returns a single star",
    type: "Star",
    args: {
      id: t.arg.id({
        description: "ID of the star",
        required: true,
      }),
    },
    resolve: (_query, _root, args, _context, _info) =>
      queryStarByIdOrThrow(Number(args.id)),
  }),

  constellations: t.prismaField({
    description: "Returns a list of constellations",
    type: ["Constellation"],
    resolve: () => queryConstellationList(),
  }),

  constellation: t.prismaField({
    description: "Returns a single constellation",
    type: "Constellation",
    args: {
      id: t.arg.id({
        description: "ID of the constellation",
        required: true,
      }),
    },
    resolve: (_query, _root, args, _context, _info) =>
      queryConstellationByIdOrThrow(Number(args.id)),
  }),
}));
