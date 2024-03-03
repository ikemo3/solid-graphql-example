/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `Byte` scalar type represents byte value as a Buffer */
  Byte: { input: any; output: any; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
};

/** A constellation in the sky */
export type Constellation = {
  __typename?: 'Constellation';
  /** レコード作成日時 */
  createdAt: Scalars['DateTime']['output'];
  /** The ID of the constellation */
  id: Scalars['ID']['output'];
  /** The name of the constellation */
  name: Scalars['String']['output'];
  /** The stars in the constellation */
  stars: Array<Star>;
  /** レコード更新日時 */
  updatedAt: Scalars['DateTime']['output'];
};

/** Root Mutation */
export type Mutation = {
  __typename?: 'Mutation';
  /** Broadcast a random number to all subscribers */
  broadcastRandomNumber: Scalars['Boolean']['output'];
  /** Send a date to the server. */
  sendDate: SendDatePayload;
  /** Send a file to the server. */
  sendFile: SendFilePayload;
};


/** Root Mutation */
export type MutationSendDateArgs = {
  input: SendDateInput;
};


/** Root Mutation */
export type MutationSendFileArgs = {
  input: SendFileInput;
};

/** Root Query */
export type Query = {
  __typename?: 'Query';
  /** Returns a single constellation */
  constellation: Constellation;
  /** Returns a list of constellations */
  constellations: Array<Constellation>;
  /** Get the URL of a file from the server. */
  fileUrl: Scalars['String']['output'];
  /** A simple type for getting started! */
  hello: Scalars['String']['output'];
  /** List all files in the server. */
  listFiles: Array<Scalars['String']['output']>;
  /** Returns a single star */
  star: Star;
  /** Returns a list of stars */
  stars: Array<Star>;
};


/** Root Query */
export type QueryConstellationArgs = {
  id: Scalars['ID']['input'];
};


/** Root Query */
export type QueryFileUrlArgs = {
  key: Scalars['String']['input'];
};


/** Root Query */
export type QueryHelloArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


/** Root Query */
export type QueryStarArgs = {
  id: Scalars['ID']['input'];
};

/** The input of the sendDate mutation. */
export type SendDateInput = {
  /** The date to send to the server. */
  date: Scalars['DateTime']['input'];
};

/** The payload of the sendDate mutation. */
export type SendDatePayload = {
  __typename?: 'SendDatePayload';
  /** The date. */
  date: Scalars['DateTime']['output'];
  /** The global ID of the date. */
  id: Scalars['ID']['output'];
};

/** The input of the sendFile mutation. */
export type SendFileInput = {
  /** The content type of the file. */
  contentType: Scalars['String']['input'];
  /** The file to send to the server. */
  file: Scalars['Byte']['input'];
  /** The name of the file. */
  name: Scalars['String']['input'];
};

/** The payload of the sendFile mutation. */
export type SendFilePayload = {
  __typename?: 'SendFilePayload';
  /** The global ID of the file. */
  id: Scalars['ID']['output'];
  /** The key of the file. */
  key: Scalars['String']['output'];
};

/** A star in the sky */
export type Star = {
  __typename?: 'Star';
  /** The constellation the star is in */
  constellation: Constellation;
  /** レコード作成日時 */
  createdAt: Scalars['DateTime']['output'];
  /** The ID of the star */
  id: Scalars['ID']['output'];
  /** The name of the star */
  name: Scalars['String']['output'];
  /** レコード更新日時 */
  updatedAt: Scalars['DateTime']['output'];
};

/** Root Subscription */
export type Subscription = {
  __typename?: 'Subscription';
  /** A random number subscription */
  randomNumber: Scalars['Float']['output'];
};

export type SendDateMutationMutationVariables = Exact<{
  input: SendDateInput;
}>;


export type SendDateMutationMutation = { __typename?: 'Mutation', sendDate: { __typename?: 'SendDatePayload', date: any } };

export type SendFileMutationSuccessMutationVariables = Exact<{
  input: SendFileInput;
}>;


export type SendFileMutationSuccessMutation = { __typename?: 'Mutation', sendFile: { __typename?: 'SendFilePayload', key: string } };

export type SendFileMutationFailureMutationVariables = Exact<{
  input: SendFileInput;
}>;


export type SendFileMutationFailureMutation = { __typename?: 'Mutation', sendFile: { __typename?: 'SendFilePayload', key: string } };

export type ListFilesQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type ListFilesQueryQuery = { __typename?: 'Query', listFiles: Array<string> };

export type FileUrlQueryQueryVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type FileUrlQueryQuery = { __typename?: 'Query', fileUrl: string };

export type HelloQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQueryQuery = { __typename?: 'Query', hello: string };

export type HelloQueryWithNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type HelloQueryWithNameQuery = { __typename?: 'Query', hello: string };

export type StarQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type StarQueryQuery = { __typename?: 'Query', stars: Array<{ __typename?: 'Star', id: string, name: string, createdAt: any, updatedAt: any }> };

export type StarQuerySingleQueryVariables = Exact<{ [key: string]: never; }>;


export type StarQuerySingleQuery = { __typename?: 'Query', star: { __typename?: 'Star', id: string, name: string, createdAt: any, updatedAt: any, constellation: { __typename?: 'Constellation', id: string, name: string } } };

export type ConstellationQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type ConstellationQueryQuery = { __typename?: 'Query', constellations: Array<{ __typename?: 'Constellation', id: string, name: string, createdAt: any, updatedAt: any }> };

export type ConstellationQuerySingleQueryVariables = Exact<{ [key: string]: never; }>;


export type ConstellationQuerySingleQuery = { __typename?: 'Query', constellation: { __typename?: 'Constellation', id: string, name: string, createdAt: any, updatedAt: any, stars: Array<{ __typename?: 'Star', id: string, name: string }> } };


export const SendDateMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendDateMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendDateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<SendDateMutationMutation, SendDateMutationMutationVariables>;
export const SendFileMutationSuccessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendFileMutationSuccess"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendFileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}}]}}]}}]} as unknown as DocumentNode<SendFileMutationSuccessMutation, SendFileMutationSuccessMutationVariables>;
export const SendFileMutationFailureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendFileMutationFailure"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendFileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}}]}}]}}]} as unknown as DocumentNode<SendFileMutationFailureMutation, SendFileMutationFailureMutationVariables>;
export const ListFilesQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListFilesQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listFiles"}}]}}]} as unknown as DocumentNode<ListFilesQueryQuery, ListFilesQueryQueryVariables>;
export const FileUrlQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FileUrlQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}}]}]}}]} as unknown as DocumentNode<FileUrlQueryQuery, FileUrlQueryQueryVariables>;
export const HelloQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HelloQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hello"}}]}}]} as unknown as DocumentNode<HelloQueryQuery, HelloQueryQueryVariables>;
export const HelloQueryWithNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HelloQueryWithName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hello"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}]}}]} as unknown as DocumentNode<HelloQueryWithNameQuery, HelloQueryWithNameQueryVariables>;
export const StarQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StarQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stars"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<StarQueryQuery, StarQueryQueryVariables>;
export const StarQuerySingleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StarQuerySingle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"star"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"constellation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<StarQuerySingleQuery, StarQuerySingleQueryVariables>;
export const ConstellationQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ConstellationQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"constellations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ConstellationQueryQuery, ConstellationQueryQueryVariables>;
export const ConstellationQuerySingleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ConstellationQuerySingle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"constellation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"stars"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ConstellationQuerySingleQuery, ConstellationQuerySingleQueryVariables>;