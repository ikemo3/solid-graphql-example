import type { TypedDocumentNode } from "@graphql-typed-document-node/core/typings";
import { type ExecutionResult, print } from "graphql";
import { createClient } from "graphql-sse";

import { getAccessToken } from "./auth";

const url = import.meta.env.VITE_API_BASE_URL + "/graphql";

export async function executeOperation<TResult, TVariables>(
  operation: TypedDocumentNode<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): Promise<ExecutionResult<TResult>> {
  const token = await getAccessToken();

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify({
      query: print(operation),
      variables: variables ?? undefined,
    }),
  });

  return response.json();
}

export type SubscriptionResult<TResult> = AsyncIterableIterator<
  ExecutionResult<TResult>
>;

export async function executeSubscription<TResult, TVariables>(
  operation: TypedDocumentNode<TResult, TVariables>,
): Promise<SubscriptionResult<TResult>> {
  const token = await getAccessToken();

  const client = createClient({
    // singleConnection: true, preferred for HTTP/1 enabled servers and subscription heavy apps
    url,
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return client.iterate({
    query: print(operation),
  });
}
