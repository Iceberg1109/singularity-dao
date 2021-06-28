import React from "react";
import { Card as DefaultCard } from "reactstrap";
import Typography from "components/Typography";
// import { GradientButton } from "components/Buttons";
import styled from "styled-components";
// import { DetailLabel } from "../TokenFunctionPanelStake/Label";
import { useQuery } from "@apollo/client";
import { PAIR_QUERY } from "../../queries/pair";
import BigNumber from "bignumber.js";
import { DetailLabel } from "../TokenFunctionPanelSwap/Label";

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

const PoolInfoPanel = ({ pairAddress }) => {
  const { loading, data, error } = useQuery(PAIR_QUERY, {
    variables: { id: pairAddress },
    skip: !pairAddress,
  });

  console.log(pairAddress, "PoolInfoPanel", data);

  if (!pairAddress || loading) {
    return (
      <Card className="p-4">
        <p>Loading</p>
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

  if (!token0Symbol) {
    return (
      <Card className="p-4">
        <Typography color="text1" size={20} weight={600} className="d-flex justify-content-center">
          Pool Info
        </Typography>
        <Typography color="text1" size={20} weight={600} className="d-flex justify-content-center">
          Not Available
        </Typography>
      </Card>
    );
  }

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
