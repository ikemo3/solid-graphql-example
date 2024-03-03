/* eslint-disable */
import type { Prisma, Star, Constellation } from "@prisma/client";
export default interface PrismaTypes {
  Star: {
    Name: "Star";
    Shape: Star;
    Include: Prisma.StarInclude;
    Select: Prisma.StarSelect;
    OrderBy: Prisma.StarOrderByWithRelationInput;
    WhereUnique: Prisma.StarWhereUniqueInput;
    Where: Prisma.StarWhereInput;
    Create: {};
    Update: {};
    RelationName: "constellation";
    ListRelations: never;
    Relations: {
      constellation: {
        Shape: Constellation;
        Name: "Constellation";
        Nullable: false;
      };
    };
  };
  Constellation: {
    Name: "Constellation";
    Shape: Constellation;
    Include: Prisma.ConstellationInclude;
    Select: Prisma.ConstellationSelect;
    OrderBy: Prisma.ConstellationOrderByWithRelationInput;
    WhereUnique: Prisma.ConstellationWhereUniqueInput;
    Where: Prisma.ConstellationWhereInput;
    Create: {};
    Update: {};
    RelationName: "stars";
    ListRelations: "stars";
    Relations: {
      stars: {
        Shape: Star[];
        Name: "Star";
        Nullable: false;
      };
    };
  };
}
