import { assertSingleValue } from "@assert";
import { graphql } from "@gql";
import { graphQLTest } from "@setup";

describe("date", () => {
  graphQLTest("should send a date to the server", async ({ executor }) => {
    const date = new Date("2021-01-01T00:00:00.000Z");

    const sendDateMutation = graphql(`
      mutation SendDateMutation($input: SendDateInput!) {
        sendDate(input: $input) {
          date
        }
      }
    `);

    const result = await executor({
      document: sendDateMutation,
      variables: {
        input: {
          date,
        },
      },
    });

    assertSingleValue(result);

    expect(result.data?.sendDate.date).toStrictEqual(date.toISOString());
  });
});
