import React from "react";
import { Card as DefaultCard } from "reactstrap";
import Typography from "components/Typography";
import { GradientButton } from "components/Buttons";
import CurrencyInputPanelSDAO from "components/CurrencyInputPanelLP";
import styled, { ThemeContext } from "styled-components";

const Card = styled(DefaultCard)`
  border-radius: 8px;
`;

const AddLiquidityPanel = () => {
  return (
    <Card className="p-4">
      <Typography color="text1" size={32} weight={600} className="d-flex justify-content-center">
        Add Liquidity
      </Typography>
      <CurrencyInputPanelSDAO label="SDAO" balance="123" onChange={console.log} toCurrencyPrice={456} />
      <Typography className="d-flex justify-content-center">+</Typography>
      <CurrencyInputPanelSDAO label="SDAO" balance="123" onChange={console.log} toCurrencyPrice={456} />
      <GradientButton>Add Liquidity</GradientButton>
    </Card>
  );
};

export default AddLiquidityPanel;
