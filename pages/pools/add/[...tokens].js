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
import TokenFunctionPanelAddPool from "components/TokenFunctionPanelAddPool";
import { toast } from "react-toastify";

function Add() {
  const router = useRouter();
  const { tokens } = router.query;
  const { library, account, network, chainId } = useUser();
  const [fromCurrency, setFromCurrency] = useState("ETH");
  const [toCurrency, setToCurrency] = useState("SDAO");
  const [pairAddress, setPairAddress] = useState("");

  const getCurrency = async (token) => {
    let currency;
    if (token === "0xc778417e063141139fce010982780140aa0cd5ab") {
      currency = "ETH";
    } else {
      currency = await getTokenSymbol(token);
    }

    return currency ?? "";
  };

  const getTokenSymbol = async (address) => {
    if (!account || !library) return;
    // DYNASET BALANCE
    const signer = await library.getSigner(account);
    const tokenContract = new ethers.Contract(address, DynasetABI, signer);
    const currency = await tokenContract.symbol();

    return currency;
  };

  const getSymbols = async (tokens) => {
    if (tokens) {
      const fromCurrency = await getCurrency(tokens[0]);
      const toCurrency = await getCurrency(tokens[1]);
      setFromCurrency(fromCurrency);
      setToCurrency(toCurrency);
    }
  };

  useEffect(() => {
    getSymbols(tokens);
  }, [tokens]);

  useEffect(() => getPairData(), []);

  useEffect(() => {
    if (!chainId) return;
    getPairData();
  }, [tokens, chainId, account]);

  const getPairData = async () => {
    try {
      if (!chainId || !account || !library) return;

      if (!tokens) throw new Error("Token addresses not available");
      console.log("tokens", tokens[0], chainId);
      const token1 = new Token(chainId, tokens[0], 18);
      const token2 = new Token(chainId, tokens[1], 18);
      const pair = await Fetcher.fetchPairData(token1, token2);
      console.log("pair dataa", pair);
      console.log("token 0 ", pair.tokenAmounts[0].toSignificant(8));
      console.log("token 1 ", pair.tokenAmounts[1].toSignificant(8));
      const liquidityToken = pair.liquidityToken;
      setPairAddress(liquidityToken.address.toLowerCase());

      console.log();
    } catch (error) {
      console.log("pair erorrrr", error);
      toast(error.message, { type: "error" });
    }
  };

  return (
    <Container className="my-4">
      <Typography color="text1" size={32} weight={600}>
        {fromCurrency}→{toCurrency}
      </Typography>
        <br/>
      <Typography color="gray80" size={14}>
        Tip: When you add liquidity, you will receive pool tokens representing your position. These tokens automatically
        earn fees proportional to your share of the pool, and can be redeemed at any time.
      </Typography>
          <br/>
              <br/>
      <TokenFunctionPanelAddPool tokens={tokens} pairAddress={pairAddress} />
    </Container>
  );
}

Add.layout = Admin;

export default Add;
