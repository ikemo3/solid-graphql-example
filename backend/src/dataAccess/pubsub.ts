import { createRedisEventTarget } from "@graphql-yoga/redis-event-target";
import { createPubSub as PubSub } from "graphql-yoga";
import { Redis } from "ioredis";

import { PubSubChannel } from "../types";

export function createPubSub() {
  const publishClient = new Redis(process.env.PUBSUB_URL);
  const subscribeClient = new Redis(process.env.PUBSUB_URL);

  const eventTarget = createRedisEventTarget({
    publishClient,
    subscribeClient,
  });

  return PubSub<PubSubChannel>({ eventTarget });
}
