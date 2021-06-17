import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Input, Modal, Button } from "reactstrap";
import Admin from "layouts/Admin.js";

import Typography, { GradientTypography } from "../../components/Typography";
import classnames from "classnames";
import TokenFunctionPanel, { PanelTypes } from "../../components/TokenFunctionPanelStake/index.js";

function StakeWithdraw() {
  return (
    <Container className="my-4">
      <TokenFunctionPanel panelType={PanelTypes.WITHDRAW} />
    </Container>
  );
}

StakeWithdraw.layout = Admin;

export default StakeWithdraw;
