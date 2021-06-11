import React from "react";
import Admin from "layouts/Admin.js";
import {  Col, Container, Row } from "reactstrap";
import Typography from "components/Typography";
import AddLiquidityPanel from "components/AddLiquidityPanel";
import PoolInfoPanel from "components/PoolInfoPanel";

export default function Add() {
  return (
    <Container className="my-4">
      <Typography color="text1" size={32} weight={600}>
        SDAO→WETH
      </Typography>
      <Typography color="gray80" size={14}>
        Tip: When you add liquidity, you will receive pool tokens representing your position. These tokens automatically
        earn fees proportional to your share of the pool, and can be redeemed at any time.
      </Typography>
      <a>Learn more</a>
      <Row>
        <Col lg={7}>
          <AddLiquidityPanel />
        </Col>
        <Col lg={5}>
          <PoolInfoPanel />
        </Col>
      </Row>
    </Container>
  );
}

Add.layout = Admin;
