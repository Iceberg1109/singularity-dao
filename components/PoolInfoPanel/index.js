import React from "react";
import { Card as DefaultCard } from "reactstrap";
import Typography from "components/Typography";
import { GradientButton } from "components/Buttons";
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

const Card = styled(DefaultCard)`
  border-radius: 8px;
`;

const DetailLabel = ({ title, desc }) => {
  const themeContext = useContext(ThemeContext);
  console.log("themeContext", themeContext);
  return (
    <div className="d-flex justify-content-between">
      <Typography size="14" weight="400" style={{ color: themeContext.color.text2 }}>
        {title}
      </Typography>
      <Typography size="14" weight="600" style={{ color: themeContext.color.text1 }}>
        {desc}
      </Typography>
    </div>
  );
};

const PoolInfoPanel = () => {
  return (
    <Card className="p-4">
      <Typography color="text1" size={32} weight={600} className="d-flex justify-content-center">
        Add Liquidity
      </Typography>
      <DetailLabel title="SDAO→WETH" desc="$ 407,004,574" />
      <DetailLabel title="WETH→SDAO" desc="4.82%" />
      <DetailLabel title="Share of Liquidity Pool" desc="0.005%" />
      <DetailLabel title="Daily estimation fee" desc="960.00 SDAO LP" />
      <div className="mt-4" />
      <DetailLabel title="Slippage" desc="$ 407,004,574" />
      <DetailLabel title="Minimum received" desc="4.82%" />
      <DetailLabel title="Transaction speed" desc="0.005%" />
      <GradientButton>Add Liquidity</GradientButton>
    </Card>
  );
};

export default PoolInfoPanel;
