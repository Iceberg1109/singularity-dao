import gql from "graphql-tag";

export const USER_LIQUIDITY_QUERY = gql`
  query ($userAddress: Bytes!, $userAndPairAddress: Bytes!) {
    user(id: $userAddress) {
      id
      liquidityPositions(where: { id: $userAndPairAddress }) {
        id
        pair {
          id
          volumeUSD
          reserveUSD
          totalSupply
        }
        liquidityTokenBalance
      }
      usdSwapped
    }
  }
`;
