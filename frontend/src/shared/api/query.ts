import { graphql } from "@shared/lib/generated";

import { executeOperation } from "./graphqlOperation";

const HelloQuery = graphql(`
  query Hello($name: String) {
    hello(name: $name)
  }
`);

const StarsQuery = graphql(`
  query Stars {
    stars {
      id
      name
      constellation {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`);

const ListFilesQuery = graphql(`
  query ListFiles {
    listFiles
  }
`);

const FileUrlQuery = graphql(`
  query FileUrl($key: String!) {
    fileUrl(key: $key)
  }
`);

const helloQuery = async (name: string) => {
  const result = await executeOperation(HelloQuery, { name });
  return result;
};

const starsQuery = async () => {
  const result = await executeOperation(StarsQuery);
  return result;
};

const listFilesQuery = async () => {
  const result = await executeOperation(ListFilesQuery);
  return result;
};

const fileUrlQuery = async (key: string) => {
  const result = await executeOperation(FileUrlQuery, { key });
  return result;
};

export { fileUrlQuery, helloQuery, listFilesQuery, starsQuery };
