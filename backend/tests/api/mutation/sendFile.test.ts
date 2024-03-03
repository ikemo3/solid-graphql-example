import { assertSingleValue } from "@assert";
import { graphql } from "@gql";
import { graphQLTest } from "@setup";

describe("file", () => {
  graphQLTest("should send a file to the server", async ({ executor }) => {
    // ファイルをBASE64エンコードする
    const file = Buffer.from("test").toString("base64");
    const name = "test.txt";
    const contentType = "text/plain";

    const sendFileMutation = graphql(`
      mutation SendFileMutationSuccess($input: SendFileInput!) {
        sendFile(input: $input) {
          key
        }
      }
    `);

    const result = await executor({
      document: sendFileMutation,
      variables: {
        input: {
          file,
          name,
          contentType,
        },
      },
    });

    assertSingleValue(result);

    expect(result.data?.sendFile.key).toStrictEqual(`/upload/${name}`);
  });

  graphQLTest(
    "should throw an error if the content type is invalid",
    async ({ executor }) => {
      // ファイルをBASE64エンコードする
      const file = Buffer.from("test").toString("base64");
      const name = "test.txt";
      const contentType = "invalid"; // 無効なContentType

      const sendFileMutation = graphql(`
        mutation SendFileMutationFailure($input: SendFileInput!) {
          sendFile(input: $input) {
            key
          }
        }
      `);

      const result = await executor({
        document: sendFileMutation,
        variables: {
          input: {
            file,
            name,
            contentType,
          },
        },
      });

      assertSingleValue(result);

      expect(result.errors).toHaveLength(1);
      expect(result.errors?.[0].message).toBe(
        `Invalid content type: ${contentType}`,
      );
    },
  );
});
