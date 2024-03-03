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
  Byte: { input: FileData; output: FileData; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: Date; output: Date; }
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

export type BroadcastRandomNumberMutationVariables = Exact<{ [key: string]: never; }>;


export type BroadcastRandomNumberMutation = { __typename?: 'Mutation', broadcastRandomNumber: boolean };

export type SendDateMutationVariables = Exact<{
  input: SendDateInput;
}>;


export type SendDateMutation = { __typename?: 'Mutation', sendDate: { __typename?: 'SendDatePayload', id: string, date: Date } };

export type SendFileMutationVariables = Exact<{
  input: SendFileInput;
}>;


export type SendFileMutation = { __typename?: 'Mutation', sendFile: { __typename?: 'SendFilePayload', id: string, key: string } };

export type HelloQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type StarsQueryVariables = Exact<{ [key: string]: never; }>;


export type StarsQuery = { __typename?: 'Query', stars: Array<{ __typename?: 'Star', id: string, name: string, createdAt: Date, updatedAt: Date, constellation: { __typename?: 'Constellation', id: string, name: string } }> };

export type ListFilesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListFilesQuery = { __typename?: 'Query', listFiles: Array<string> };

export type FileUrlQueryVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type FileUrlQuery = { __typename?: 'Query', fileUrl: string };

export type RandomNumberSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RandomNumberSubscription = { __typename?: 'Subscription', randomNumber: number };


export const BroadcastRandomNumberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BroadcastRandomNumber"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"broadcastRandomNumber"}}]}}]} as unknown as DocumentNode<BroadcastRandomNumberMutation, BroadcastRandomNumberMutationVariables>;
export const SendDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendDateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<SendDateMutation, SendDateMutationVariables>;
export const SendFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendFileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}}]}}]}}]} as unknown as DocumentNode<SendFileMutation, SendFileMutationVariables>;
export const HelloDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Hello"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hello"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}]}}]} as unknown as DocumentNode<HelloQuery, HelloQueryVariables>;
export const StarsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Stars"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stars"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"constellation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<StarsQuery, StarsQueryVariables>;
export const ListFilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListFiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listFiles"}}]}}]} as unknown as DocumentNode<ListFilesQuery, ListFilesQueryVariables>;
export const FileUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FileUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}}]}]}}]} as unknown as DocumentNode<FileUrlQuery, FileUrlQueryVariables>;
export const RandomNumberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"RandomNumber"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"randomNumber"}}]}}]} as unknown as DocumentNode<RandomNumberSubscription, RandomNumberSubscriptionVariables>;