import React from "react";
import { Card as DefaultCard } from "reactstrap";
import Typography from "components/Typography";
import { GradientButton } from "components/Buttons";
import styled from "styled-components";
import { DetailLabel } from "../TokenFunctionPanelStake/Label";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "@apollo/client";
import { PAIR_QUERY } from "../../queries/pair";
import BigNumber from "bignumber.js";

const Card = styled(DefaultCard)`
  border-radius: 8px;
`;

const PoolInfoPanel = ({ pairAddress }) => {
  const { loading, data, error } = useQuery(PAIR_QUERY, {
    variables: { id: pairAddress },
    skip: !pairAddress,
  });

  console.log(pairAddress, "PoolInfoPanel", data);

  if (!pairAddress || loading) {
    return (
      <Card className="p-4">
        <div className="d-flex justify-content-center">
          <Skeleton height={25} width={200} />
        </div>
        <br />
        <Skeleton count={4} />
        <br />
        <Skeleton count={4} />
      </Card>
    );
  }

  const cleanBigNumber = (value) => (value ? BigNumber(value).decimalPlaces(4).toString() : "");

  const token0Symbol = data.pair?.token0.symbol;
  const token1Symbol = data.pair?.token1.symbol;
  const token0Price = cleanBigNumber(data.pair?.token0Price);
  const token1Price = cleanBigNumber(data.pair?.token1Price);
  const totalLiquidity = cleanBigNumber(data.pair?.reserveUSD);
  const reserve0 = cleanBigNumber(data.pair?.reserve0);
  const reserve1 = cleanBigNumber(data.pair?.reserve1);

  return (
    <Card className="p-4">
      <Typography color="text1" size={20} weight={600} className="d-flex justify-content-center">
        Pool Info
      </Typography>
      <DetailLabel title={`${token1Symbol}→${token0Symbol}`} desc={`${token0Price} ${token0Symbol}`} />
      <DetailLabel title={`${token0Symbol}→${token1Symbol}`} desc={`${token1Price} ${token1Symbol}`} />
      <DetailLabel title="Total Liquidity" desc={`~ US$ ${totalLiquidity}`} />

      <div className="mt-4" />
      <DetailLabel title="Slippage" desc="0.5%" />
      <DetailLabel title={`Pool ${token0Symbol}`} desc={`${reserve0} ${token0Symbol}`} />
      <DetailLabel title={`Pool ${token1Symbol}`} desc={`${reserve1} ${token1Symbol}`} />
    </Card>
  );
};

export default PoolInfoPanel;
