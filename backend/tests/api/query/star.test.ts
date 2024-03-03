import { assertSingleValue } from "@assert";
import { graphql } from "@gql";
import { graphQLTest } from "@setup";

describe("star", () => {
  graphQLTest("should return a list of stars", async ({ executor }) => {
    const starQuery = graphql(`
      query StarQuery {
        stars {
          id
          name
          createdAt
          updatedAt
        }
      }
    `);

    const result = await executor({ document: starQuery });

    assertSingleValue(result);

    expect(result.data?.stars).toStrictEqual([
      {
        id: "1",
        name: "シリウス",
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
      {
        id: "2",
        name: "アルファ・ケンタウリ",
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
      {
        id: "3",
        name: "ベテルギウス",
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
      {
        id: "4",
        name: "リゲル",
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ]);
  });

  graphQLTest("should return a single star", async ({ executor }) => {
    const starQuery = graphql(`
      query StarQuerySingle {
        star(id: 1) {
          id
          name
          createdAt
          updatedAt
          constellation {
            id
            name
          }
        }
      }
    `);

    const result = await executor({ document: starQuery });

    assertSingleValue(result);

    expect(result.data?.star).toStrictEqual({
      id: "1",
      name: "シリウス",
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      constellation: {
        id: "2",
        name: "おおいぬ座",
      },
    });
  });

  graphQLTest(
    "should return a list of constellations",
    async ({ executor }) => {
      const constellationQuery = graphql(`
        query ConstellationQuery {
          constellations {
            id
            name
            createdAt
            updatedAt
          }
        }
      `);

      const result = await executor({ document: constellationQuery });

      assertSingleValue(result);

      expect(result.data?.constellations).toStrictEqual([
        {
          id: "1",
          name: "オリオン座",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
        {
          id: "2",
          name: "おおいぬ座",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
        {
          id: "3",
          name: "ケンタウルス座",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]);
    },
  );

  graphQLTest("should return a single constellation", async ({ executor }) => {
    const constellationQuery = graphql(`
      query ConstellationQuerySingle {
        constellation(id: 1) {
          id
          name
          createdAt
          updatedAt
          stars {
            id
            name
          }
        }
      }
    `);

    const result = await executor({ document: constellationQuery });

    assertSingleValue(result);

    expect(result.data?.constellation).toStrictEqual({
      id: "1",
      name: "オリオン座",
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      stars: [
        {
          id: "3",
          name: "ベテルギウス",
        },
        {
          id: "4",
          name: "リゲル",
        },
      ],
    });
  });
});
