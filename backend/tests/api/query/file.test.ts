import { assertSingleValue } from "@assert";
import { uploadPlainText } from "@dataAccess/s3";
import { graphql } from "@gql";
import { graphQLTest } from "@setup";

describe("file", () => {
  graphQLTest("should list files", async ({ s3, executor }) => {
    // オブジェクトをAPIでアップロードする
    const key1 = `upload/test1.txt`;
    await uploadPlainText(s3, key1, "test1");
    const key2 = `upload/test2.txt`;
    await uploadPlainText(s3, key2, "test2");

    const listFilesQuery = graphql(`
      query ListFilesQuery {
        listFiles
      }
    `);

    const result = await executor({ document: listFilesQuery });

    assertSingleValue(result);

    expect(result.data?.listFiles).toStrictEqual([key1, key2]);
  });

  // listFilesでファイルが存在しない場合
  graphQLTest(
    "should return an empty array if there are no files",
    async ({ executor }) => {
      const listFilesQuery = graphql(`
        query ListFilesQuery {
          listFiles
        }
      `);

      const result = await executor({ document: listFilesQuery });

      assertSingleValue(result);

      expect(result.data?.listFiles).toStrictEqual([]);
    },
  );

  graphQLTest("should return the URL of the file", async ({ s3, executor }) => {
    const body = "test";
    const key = `upload/test.txt`;

    // オブジェクトをAPIでアップロードする
    await uploadPlainText(s3, key, body);

    const fileUrlQuery = graphql(`
      query FileUrlQuery($key: String!) {
        fileUrl(key: $key)
      }
    `);

    const result = await executor({
      document: fileUrlQuery,
      variables: { key },
    });

    assertSingleValue(result);

    const fileUrl = result.data?.fileUrl;
    if (!fileUrl) {
      throw new Error("fileUrl is not defined");
    }

    // URLにアクセスしてファイルが存在するか検証
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const text = await blob.text();
    expect(text).toBe(body);
  });
});
