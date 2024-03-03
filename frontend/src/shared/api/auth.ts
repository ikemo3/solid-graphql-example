export type AuthClient = {
  getAccessToken: () => Promise<string>;
};

let authClient: AuthClient;

export function initializeAuthClient(client: AuthClient) {
  authClient = client;
}

export function getAccessToken() {
  return authClient.getAccessToken();
}
