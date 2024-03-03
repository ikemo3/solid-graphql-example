/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n      mutation SendDateMutation($input: SendDateInput!) {\n        sendDate(input: $input) {\n          date\n        }\n      }\n    ": types.SendDateMutationDocument,
    "\n      mutation SendFileMutationSuccess($input: SendFileInput!) {\n        sendFile(input: $input) {\n          key\n        }\n      }\n    ": types.SendFileMutationSuccessDocument,
    "\n        mutation SendFileMutationFailure($input: SendFileInput!) {\n          sendFile(input: $input) {\n            key\n          }\n        }\n      ": types.SendFileMutationFailureDocument,
    "\n      query ListFilesQuery {\n        listFiles\n      }\n    ": types.ListFilesQueryDocument,
    "\n        query ListFilesQuery {\n          listFiles\n        }\n      ": types.ListFilesQueryDocument,
    "\n      query FileUrlQuery($key: String!) {\n        fileUrl(key: $key)\n      }\n    ": types.FileUrlQueryDocument,
    "\n      query HelloQuery {\n        hello\n      }\n    ": types.HelloQueryDocument,
    "\n      query HelloQueryWithName($name: String!) {\n        hello(name: $name)\n      }\n    ": types.HelloQueryWithNameDocument,
    "\n      query StarQuery {\n        stars {\n          id\n          name\n          createdAt\n          updatedAt\n        }\n      }\n    ": types.StarQueryDocument,
    "\n      query StarQuerySingle {\n        star(id: 1) {\n          id\n          name\n          createdAt\n          updatedAt\n          constellation {\n            id\n            name\n          }\n        }\n      }\n    ": types.StarQuerySingleDocument,
    "\n        query ConstellationQuery {\n          constellations {\n            id\n            name\n            createdAt\n            updatedAt\n          }\n        }\n      ": types.ConstellationQueryDocument,
    "\n      query ConstellationQuerySingle {\n        constellation(id: 1) {\n          id\n          name\n          createdAt\n          updatedAt\n          stars {\n            id\n            name\n          }\n        }\n      }\n    ": types.ConstellationQuerySingleDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation SendDateMutation($input: SendDateInput!) {\n        sendDate(input: $input) {\n          date\n        }\n      }\n    "): (typeof documents)["\n      mutation SendDateMutation($input: SendDateInput!) {\n        sendDate(input: $input) {\n          date\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation SendFileMutationSuccess($input: SendFileInput!) {\n        sendFile(input: $input) {\n          key\n        }\n      }\n    "): (typeof documents)["\n      mutation SendFileMutationSuccess($input: SendFileInput!) {\n        sendFile(input: $input) {\n          key\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        mutation SendFileMutationFailure($input: SendFileInput!) {\n          sendFile(input: $input) {\n            key\n          }\n        }\n      "): (typeof documents)["\n        mutation SendFileMutationFailure($input: SendFileInput!) {\n          sendFile(input: $input) {\n            key\n          }\n        }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query ListFilesQuery {\n        listFiles\n      }\n    "): (typeof documents)["\n      query ListFilesQuery {\n        listFiles\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        query ListFilesQuery {\n          listFiles\n        }\n      "): (typeof documents)["\n        query ListFilesQuery {\n          listFiles\n        }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query FileUrlQuery($key: String!) {\n        fileUrl(key: $key)\n      }\n    "): (typeof documents)["\n      query FileUrlQuery($key: String!) {\n        fileUrl(key: $key)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query HelloQuery {\n        hello\n      }\n    "): (typeof documents)["\n      query HelloQuery {\n        hello\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query HelloQueryWithName($name: String!) {\n        hello(name: $name)\n      }\n    "): (typeof documents)["\n      query HelloQueryWithName($name: String!) {\n        hello(name: $name)\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query StarQuery {\n        stars {\n          id\n          name\n          createdAt\n          updatedAt\n        }\n      }\n    "): (typeof documents)["\n      query StarQuery {\n        stars {\n          id\n          name\n          createdAt\n          updatedAt\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query StarQuerySingle {\n        star(id: 1) {\n          id\n          name\n          createdAt\n          updatedAt\n          constellation {\n            id\n            name\n          }\n        }\n      }\n    "): (typeof documents)["\n      query StarQuerySingle {\n        star(id: 1) {\n          id\n          name\n          createdAt\n          updatedAt\n          constellation {\n            id\n            name\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        query ConstellationQuery {\n          constellations {\n            id\n            name\n            createdAt\n            updatedAt\n          }\n        }\n      "): (typeof documents)["\n        query ConstellationQuery {\n          constellations {\n            id\n            name\n            createdAt\n            updatedAt\n          }\n        }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query ConstellationQuerySingle {\n        constellation(id: 1) {\n          id\n          name\n          createdAt\n          updatedAt\n          stars {\n            id\n            name\n          }\n        }\n      }\n    "): (typeof documents)["\n      query ConstellationQuerySingle {\n        constellation(id: 1) {\n          id\n          name\n          createdAt\n          updatedAt\n          stars {\n            id\n            name\n          }\n        }\n      }\n    "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;