import { graphql } from "@shared/lib/generated";

import { executeSubscription } from "./graphqlOperation";

const RandomNumberSubscription = graphql(`
  subscription RandomNumber {
    randomNumber
  }
`);

const randomNumberSubscription = async () => {
  const subscription = await executeSubscription(RandomNumberSubscription);
  return subscription;
};

export { randomNumberSubscription };
