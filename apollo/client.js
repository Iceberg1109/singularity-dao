import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { SUBGRAPH_URL_SINGDAO } from "../variables/urls";

export const client = new ApolloClient({
  link: new HttpLink({ uri: SUBGRAPH_URL_SINGDAO }),
  cache: new InMemoryCache(),
  shouldBatch: true,
});
