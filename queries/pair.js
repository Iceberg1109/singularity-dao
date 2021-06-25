import { gql } from "@apollo/client";

export const PAIR_QUERY = gql`
  query ($id: Bytes!) {
    pair(id: $id) {
      token0 {
        symbol
        name
        derivedETH
      }
      token1 {
        id
        symbol
        name
        derivedETH
      }
      token0Price
      token1Price
      reserveUSD
      reserve0
      reserve1
    }
  }
`;
