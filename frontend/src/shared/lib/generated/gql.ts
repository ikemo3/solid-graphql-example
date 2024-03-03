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
    "\n  mutation BroadcastRandomNumber {\n    broadcastRandomNumber\n  }\n": types.BroadcastRandomNumberDocument,
    "\n  mutation SendDate($input: SendDateInput!) {\n    sendDate(input: $input) {\n      id\n      date\n    }\n  }\n": types.SendDateDocument,
    "\n  mutation SendFile($input: SendFileInput!) {\n    sendFile(input: $input) {\n      id\n      key\n    }\n  }\n": types.SendFileDocument,
    "\n  query Hello($name: String) {\n    hello(name: $name)\n  }\n": types.HelloDocument,
    "\n  query Stars {\n    stars {\n      id\n      name\n      constellation {\n        id\n        name\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.StarsDocument,
    "\n  query ListFiles {\n    listFiles\n  }\n": types.ListFilesDocument,
    "\n  query FileUrl($key: String!) {\n    fileUrl(key: $key)\n  }\n": types.FileUrlDocument,
    "\n  subscription RandomNumber {\n    randomNumber\n  }\n": types.RandomNumberDocument,
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
export function graphql(source: "\n  mutation BroadcastRandomNumber {\n    broadcastRandomNumber\n  }\n"): (typeof documents)["\n  mutation BroadcastRandomNumber {\n    broadcastRandomNumber\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SendDate($input: SendDateInput!) {\n    sendDate(input: $input) {\n      id\n      date\n    }\n  }\n"): (typeof documents)["\n  mutation SendDate($input: SendDateInput!) {\n    sendDate(input: $input) {\n      id\n      date\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SendFile($input: SendFileInput!) {\n    sendFile(input: $input) {\n      id\n      key\n    }\n  }\n"): (typeof documents)["\n  mutation SendFile($input: SendFileInput!) {\n    sendFile(input: $input) {\n      id\n      key\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Hello($name: String) {\n    hello(name: $name)\n  }\n"): (typeof documents)["\n  query Hello($name: String) {\n    hello(name: $name)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Stars {\n    stars {\n      id\n      name\n      constellation {\n        id\n        name\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query Stars {\n    stars {\n      id\n      name\n      constellation {\n        id\n        name\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ListFiles {\n    listFiles\n  }\n"): (typeof documents)["\n  query ListFiles {\n    listFiles\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FileUrl($key: String!) {\n    fileUrl(key: $key)\n  }\n"): (typeof documents)["\n  query FileUrl($key: String!) {\n    fileUrl(key: $key)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription RandomNumber {\n    randomNumber\n  }\n"): (typeof documents)["\n  subscription RandomNumber {\n    randomNumber\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;