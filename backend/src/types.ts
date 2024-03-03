import { S3Client } from "@aws-sdk/client-s3";
import { PubSub } from "graphql-yoga";

export type AuthScopes = {
  public: boolean;
};

export type PubSubChannel = {
  randomNumber: [randomNumber: number];
};

export type ServerContext = {
  req: Express.Request;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type S3Config = {
  client: S3Client;
  isPathStyle: boolean;
};

export type S3Context = {
  client: S3Client;
  bucketName: string;
  isPathStyle: boolean;
};

export type UserContext = {
  sub: string;
  s3: S3Context;
  pubsub: PubSub<PubSubChannel>;
};

export type Scalars = {
  DateTime: {
    Input: Date;
    Output: Date;
  };
  Byte: {
    Input: Buffer;
    Output: Buffer;
  };
};
