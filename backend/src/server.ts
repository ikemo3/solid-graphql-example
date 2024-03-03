import { createPubSub } from "@dataAccess/pubsub";
import cors from "cors";
import express from "express";
import { auth } from "express-oauth2-jwt-bearer";
import helmet from "helmet";

import { schema } from "./api";
import { createGraphQLServer } from "./api/server";
import { initS3Client } from "./dataAccess/s3";

const app = express();
const port = 3000;

// セキュリティの設定
app.use(helmet());

// CORSの設定
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

// 認証の設定
const checkJwt = auth({
  audience: process.env.OAUTH2_AUDIENCE,
  issuerBaseURL: process.env.OAUTH2_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});
app.use(checkJwt);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// S3の設定
const s3Config = initS3Client(process.env);
const bucketName = process.env.S3_BUCKET_NAME;
const s3Context = {
  ...s3Config,
  bucketName,
};

// PubSubの設定
const pubsub = createPubSub();

const graphqlServer = createGraphQLServer(schema, s3Context, pubsub);
app.use(graphqlServer.graphqlEndpoint, graphqlServer);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
