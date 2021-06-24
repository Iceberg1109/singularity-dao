import { gql } from "@apollo/client";

export const ETH_PRICE_QUERY = gql`
  query bundles {
    bundles(where: { id: "1" }) {
      ethPrice
    }
  }
`;

export const TOKEN_QUERY = gql`
  query token($tokenAddress: Bytes!) {
    token(id: $tokenAddress) {
      derivedETH
      totalLiquidity
    }
  }
`;
