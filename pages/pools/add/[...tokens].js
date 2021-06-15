import React, { useEffect, useState } from "react";
import Admin from "layouts/Admin.js";
import {  Col, Container, Row } from "reactstrap";
import Typography from "components/Typography";
import AddLiquidityPanel from "components/AddLiquidityPanel";
import PoolInfoPanel from "components/PoolInfoPanel";
import { useRouter } from 'next/router'
import { abi as DynasetABI } from "../../../assets/constants/abi/Dynaset.json";
import { useUser } from "components/UserContext";
import { ethers } from "ethers";

export default function Add() {
  const router = useRouter()
  const { tokens } = router.query
  const { library, account, network, chainId } = useUser();
  const [fromCurrency, setFromCurrency] = useState("ETH");
  const [toCurrency, setToCurrency] = useState("SDAO");

  const getCurrency = async (token) => {
    let currency;
    if (token === '0xc778417e063141139fce010982780140aa0cd5ab') {
      currency = 'ETH'
    } else {
      currency = await getTokenSymbol(token);
    }

    return currency??'';
  }

  const getTokenSymbol = async (address) => {
    if (!account || !library) return;
    // DYNASET BALANCE
    const signer = await library.getSigner(account);
    const tokenContract = new ethers.Contract(address, DynasetABI, signer);
    const currency = await tokenContract.symbol();

    return currency;
  };

  const getSymbols = async (tokens) => {
    if(tokens) {
      const fromCurrency = await getCurrency(tokens[0])
      const toCurrency = await getCurrency(tokens[1])
      setFromCurrency(fromCurrency)
      setToCurrency(toCurrency)
    }
  }

  useEffect(() => {
    getSymbols(tokens);
  }, [tokens])

  return (
    <Container className="my-4">
      <Typography color="text1" size={32} weight={600}>
        {fromCurrency}→{toCurrency}
      </Typography>
      <Typography color="gray80" size={14}>
        Tip: When you add liquidity, you will receive pool tokens representing your position. These tokens automatically
        earn fees proportional to your share of the pool, and can be redeemed at any time.
      </Typography>
      <a>Learn more</a>
      <Row>
        <Col lg={7}>
          <AddLiquidityPanel tokens={tokens}/>
        </Col>
        <Col lg={5}>
          <PoolInfoPanel />
        </Col>
      </Row>
    </Container>
  );
}

Add.layout = Admin;
