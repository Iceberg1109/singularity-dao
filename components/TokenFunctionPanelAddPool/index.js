import React from "react";
import { Col, Row } from "reactstrap";
import AddLiquidityPanel from "components/AddLiquidityPanel";
import PoolInfoPanel from "components/PoolInfoPanel";


export default function TokenFunctionPanelAddPool({tokens, pairAddress}) {
  return (
    <Row>
      <Col lg={7}>
        <AddLiquidityPanel tokens={tokens} />
      </Col>
      <Col lg={5}>
        <PoolInfoPanel pairAddress={pairAddress} tokens={tokens} />
      </Col>
    </Row>
  );
}
