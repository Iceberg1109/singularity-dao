import React, { useEffect, useState } from "react";
import Admin from "layouts/Admin.js";
import { Col, Container, Row } from "reactstrap";
import Typography from "components/Typography";
import AddLiquidityPanel from "components/AddLiquidityPanel";
import PoolInfoPanel from "components/PoolInfoPanel";
import { useRouter } from "next/router";
import { abi as DynasetABI } from "assets/constants/abi/Dynaset.json";
import { useUser } from "components/UserContext";
import { ethers } from "ethers";
import { Fetcher, Token } from "@uniswap/sdk";

export default function TokenFunctionPanelAddPool({tokens, pairAddress}) {
  return (
    <Row>
      <Col lg={7}>
        <AddLiquidityPanel tokens={tokens} />
      </Col>
      <Col lg={5}>
        <PoolInfoPanel pairAddress={pairAddress} />
      </Col>
    </Row>
  );
}
