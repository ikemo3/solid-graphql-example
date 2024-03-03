import { assertSingleValue } from "@assert";
import { graphql } from "@gql";
import { graphQLTest } from "@setup";

describe("hello", () => {
  graphQLTest("should say hello to the world", async ({ executor }) => {
    const helloQuery = graphql(`
      query HelloQuery {
        hello
      }
    `);

    const result = await executor({ document: helloQuery });

    assertSingleValue(result);

    expect(result.data?.hello).toBe("hello, World");
  });

  graphQLTest("should say hello to a name", async ({ executor }) => {
    const helloQuery = graphql(`
      query HelloQueryWithName($name: String!) {
        hello(name: $name)
      }
    `);

    const result = await executor({
      document: helloQuery,
      variables: { name: "Test" },
    });

    assertSingleValue(result);

    expect(result.data?.hello).toBe("hello, Test");
  });
});
