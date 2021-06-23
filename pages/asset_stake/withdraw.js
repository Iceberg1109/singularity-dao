import React from "react";
import { Container } from "reactstrap";
import Admin from "layouts/Admin.js";

import TokenFunctionPanel, { PanelTypes } from "../../components/TokenFunctionPanelAStake/index.js";
function StakeWithdraw() {
  return (
    <Container className="my-4">
      <TokenFunctionPanel panelType={PanelTypes.WITHDRAW} />
    </Container>
  );
}

StakeWithdraw.layout = Admin;

export default StakeWithdraw;
