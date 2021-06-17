import React from "react";
import { Card as DefaultCard } from "reactstrap";
import Typography from "components/Typography";
import { GradientButton } from "components/Buttons";
import styled from "styled-components";
import { DetailLabel } from "../TokenFunctionPanelStake/Label";

const Card = styled(DefaultCard)`
  border-radius: 8px;
`;

const PoolInfoPanel = () => {
  return (
    <Card className="p-4">
      <Typography color="text1" size={20} weight={600} className="d-flex justify-content-center">
        Pool Info
      </Typography>
      <DetailLabel title="SDAO→WETH" desc="$ 407,004,574" />
      <DetailLabel title="WETH→SDAO" desc="4.82%" />
      <DetailLabel title="Share of Liquidity Pool" desc="0.005%" />
      <DetailLabel title="Daily estimation fee" desc="960.00 SDAO LP" />
      <div className="mt-4" />
      <DetailLabel title="Slippage" desc="$ 407,004,574" />
      <DetailLabel title="Minimum received" desc="4.82%" />
      <DetailLabel title="Transaction speed" desc="0.005%" />
      {/* <GradientButton>Add Liquidity</GradientButton> */}
    </Card>
  );
};

export default PoolInfoPanel;
