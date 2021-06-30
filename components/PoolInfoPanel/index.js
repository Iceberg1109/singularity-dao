import React, { useEffect, useState } from "react";
import { Card as DefaultCard } from "reactstrap";
import Typography from "components/Typography";
// import { GradientButton } from "components/Buttons";
import styled from "styled-components";
// import { DetailLabel } from "../TokenFunctionPanelStake/Label";
import { useQuery } from "@apollo/client";
import { PAIR_QUERY } from "../../queries/pair";
import BigNumber from "bignumber.js";
import { DetailLabel } from "../TokenFunctionPanelSwap/Label";
import { useTokenDetails } from "../../utils/hooks/useTokenDetails";
import { useUser } from "../UserContext";
import { Fetcher, Token } from "@uniswap/sdk";

const Card = styled(DefaultCard)`
  border-radius: 8px;
`;

// export const DetailLabel = ({ title, desc }) => (
//   <div className="d-flex justify-content-between">
//     <Typography size="14" weight="400" color="text2">
//       {title}
//     </Typography>
//     <Typography size="14" weight="600" color="text1">
//       {desc}
//     </Typography>
//   </div>
// );

const PoolInfoPanel = ({ pairAddress, tokens }) => {
  const [token0Price, setToken0Price] = useState(undefined);
  const [token1Price, setToken1Price] = useState(undefined);
  const [token0Reserve, setToken0Reserve] = useState(undefined);
  const [token1Reserve, setToken1Reserve] = useState(undefined);

  const { library, account, network, chainId } = useUser();
  const {
    loading: token0Loading,
    data: token0Data,
    error: token0Error,
  } = useTokenDetails(tokens ? tokens[0] : "", account, library);
  const {
    loading: token1Loading,
    data: token1Data,
    error: token1Error,
  } = useTokenDetails(tokens ? tokens[1] : "", account, library);
  const { loading, data, error } = useQuery(PAIR_QUERY, {
    variables: { id: pairAddress },
    skip: !pairAddress,
  });

  console.log(pairAddress, "PoolInfoPanel", data);

  useEffect(() => getPairData(), [token0Loading, token1Loading, tokens, account]);

  const getPairData = async () => {
    if (!token0Data || !token1Data || !library) return;
    console.log("token0Data || !token1Data", token0Data, token1Data, chainId);
    const token1 = new Token(chainId, token0Data.address, token0Data.decimals);
    const token2 = new Token(chainId, token1Data.address, token1Data.decimals);
    const pair = await Fetcher.fetchPairData(token1, token2);

    console.log("PoolInfoPanel", "token0Price", pair.token0Price.toSignificant(10));
    console.log("PoolInfoPanel", "token1Price", pair.token1Price.toSignificant(10));
    console.log("PoolInfoPanel", "reserve0", pair.reserve0.toSignificant(10));
    console.log("PoolInfoPanel", "reserve1", pair.reserve1.toSignificant(10));

    setToken0Price(pair.token0Price.toSignificant(10));
    setToken1Price(pair.token1Price.toSignificant(10));
    setToken0Reserve(pair.reserve0.toSignificant(10))
    setToken1Reserve(pair.reserve1.toSignificant(10))
  };

  if (token0Loading || token1Loading || loading) {
    return (
      <Card className="p-4">
        <p>Loading</p>
      </Card>
    );
  }

  const cleanBigNumber = (value) => (value ? BigNumber(value).decimalPlaces(4).toString() : "");

  const token0Symbol = token0Data?.symbol;
  const token1Symbol = token1Data?.symbol;
  // const token0Price = cleanBigNumber(data?.pair?.token0Price);
  // const token1Price = cleanBigNumber(data?.pair?.token1Price);
  const totalLiquidity = cleanBigNumber(data?.pair?.reserveUSD);
  // const reserve0 = cleanBigNumber(data?.pair?.reserve0);
  // const reserve1 = cleanBigNumber(data?.pair?.reserve1);

  // if (!token0Symbol) {
  //   return (
  //     <Card className="p-4">
  //       <Typography color="text1" size={20} weight={600} className="d-flex justify-content-center">
  //         Pool Info
  //       </Typography>
  //       <Typography color="text1" size={20} weight={600} className="d-flex justify-content-center">
  //         Not Available
  //       </Typography>
  //     </Card>
  //   );
  // }

  return (
    <Card className="p-4">
      <Typography color="text1" size={20} weight={600} className="d-flex justify-content-center">
        Pool Info
      </Typography>
      <DetailLabel title={`${token1Symbol}→${token0Symbol}`} desc={`${token1Price} ${token0Symbol}`} />
      <DetailLabel title={`${token0Symbol}→${token1Symbol}`} desc={`${token0Price} ${token1Symbol}`} />
      <DetailLabel title="Total Liquidity" desc={`~ US$ ${totalLiquidity || 0}`} />

      <div className="mt-4" />
      <DetailLabel title="Slippage" desc="0.5%" />
      <DetailLabel title={`Pool ${token0Symbol}`} desc={`${token0Reserve} ${token0Symbol}`} />
      <DetailLabel title={`Pool ${token1Symbol}`} desc={`${token1Reserve} ${token1Symbol}`} />
    </Card>
  );
};

export default PoolInfoPanel;
