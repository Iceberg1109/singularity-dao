import { gql } from "@apollo/client";

export const USER_LIQUIDITY_QUERY = gql`
  query ($userAddress: Bytes!, $pairAddress: Bytes!, $userAndPairAddress: Bytes!) {
    user(id: $userAddress) {
      id
      liquidityPositions(where: { id: $userAndPairAddress }) {
        id
        liquidityTokenBalance
      }
      usdSwapped
    }
    pair(id: $pairAddress) {
      reserveUSD
      totalSupply
    }
  }
`;
