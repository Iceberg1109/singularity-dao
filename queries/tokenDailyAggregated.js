import { gql } from "@apollo/client";

export const TOKEN_DAY_DATAS_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokenDayDatas(orderBy: date, orderDirection: asc, where: { token: $tokenAddress }) {
      id
      date
      priceUSD
      totalLiquidityToken
      totalLiquidityUSD
      totalLiquidityETH
      dailyVolumeETH
      dailyVolumeToken
      dailyVolumeUSD
    }
  }
`;
