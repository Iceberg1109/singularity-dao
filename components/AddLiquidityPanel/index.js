import React, { useEffect, useState } from "react";
import { Card, Spinner } from "reactstrap";
import Typography from "components/Typography";
import { GradientButton } from "components/Buttons";
import CurrencyInputPanelLP from "../../components/CurrencyInputPanelLP";
import { ContractAddress } from "../../assets/constants/addresses";
import { ChainId, Token, WETH, Trade, TokenAmount, TradeType, Fetcher, Route, Percent } from "@uniswap/sdk";
import { abi as DynasetABI } from "../../assets/constants/abi/Dynaset.json";
import web3 from "web3";
import { useUser } from "../UserContext";
import { ethers } from "ethers";
import axios from "axios";
import { defaultGasLimit, getGasPrice, defaultApprovalSDAO } from "../../utils/ethereum";
import { abi as IUniswapV2Router02ABI } from "../../assets/constants/abi/IUniswapV2Router02.json";
import { Currencies, getErc20TokenById, getUniswapToken } from "../../utils/currencies";

const fromCurrency = Currencies.SDAO.id;
const toCurrency = Currencies.ETH.id;

const AddLiquidityPanel = () => {
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const { library, account, network, chainId } = useUser();
  const [pendingTxn, setPendingTxn] = useState();
  const [addingLiquidity, setAddingLiquidity] = useState(false);

  const conversionTypes = {
    FROM: "FROM",
    TO: "TO",
  };

  const getConversionRate = async (value, type = conversionTypes.FROM) => {
    const fromToken = getUniswapToken(fromCurrency);
    const toToken = getUniswapToken(toCurrency);
    const pair = await Fetcher.fetchPairData(fromToken, toToken);
    const route = new Route([pair], fromToken);

    const tradeToken = type === conversionTypes.FROM ? fromToken : toToken;
    const tradeType = type === conversionTypes.FROM ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT;
    const trade = new Trade(route, new TokenAmount(tradeToken, web3.utils.toWei(value.toString())), tradeType);
    console.log("new trade price", trade.executionPrice.toSignificant(6));
    return trade.executionPrice.toSignificant(6);
  };

  const handleFromAmountChange = async (value) => {
    console.log("value", value);
    if (value == 0) {
      setFromAmount(0);
      setToAmount(0);
      return;
    }
    setFromAmount(value);
    setToAmount("Calculating ...");
    const tradeExecutionPrice = await getConversionRate(value, conversionTypes.FROM);
    const price = value * tradeExecutionPrice;
    setToAmount(price);
  };

  const handleToAmountChange = async (value) => {
    console.log("value", value);
    if (value == 0) {
      setFromAmount(0);
      setToAmount(0);
      return;
    }
    setToAmount(value);
    setFromAmount("Calculating ...");
    const tradeExecutionPrice = await getConversionRate(value, conversionTypes.TO);
    const price = value / tradeExecutionPrice;
    setFromAmount(price);
  };

  const approveLiquidity = async () => {
    try {
      const signer = await library.getSigner(account);
      const tokenContract = new ethers.Contract(ContractAddress.DYNASET, DynasetABI, signer);
      const gasPrice = await getGasPrice();
      const tx = await tokenContract.approve(ContractAddress.UNISWAP, defaultApprovalSDAO, {
        gasLimit: defaultGasLimit,
        gasPrice,
      });
      setPendingTxn(tx.hash);
      console.log(`Transaction hash: ${tx.hash}`);
      const receipt = await tx.wait();
      console.log(`Transaction was mined in block ${receipt.blockNumber}`);
    } catch (error) {
      console.log("unable to approve");
      throw error;
    } finally {
      setPendingTxn(undefined);
    }
  };

  const buyLiquidity = async () => {
    try {
      console.log("Adding ", web3.utils.toWei(toAmount.toString(), "ether"), " ", toCurrency, " to liquidity pool");
      const signer = await library.getSigner(account);
      const uniswap = new ethers.Contract(ContractAddress.UNISWAP, IUniswapV2Router02ABI, signer);
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
      const gasPrice = await getGasPrice();

      const amountTokenDesired = web3.utils.toWei(fromAmount.toString(), "gwei");
      const slippage = Currencies.SDAO.slippagePercent;
      const slippageMulFactor = 1 - slippage / 100;
      const amountTokenMin = ethers.BigNumber.from(amountTokenDesired) * slippageMulFactor;
      const amountETHMin = web3.utils.toWei(toAmount.toString(), "ether");
      const tx = await uniswap.addLiquidityETH(
        ContractAddress.DYNASET,
        amountTokenDesired,
        "0",
        "0",
        account,
        deadline,
        {
          gasLimit: defaultGasLimit,
          gasPrice,
          value: web3.utils.toWei(toAmount.toString()),
        }
      );
      setPendingTxn(tx.hash);
      console.log(`Transaction hash: ${tx.hash}`);
      const receipt = await tx.wait();
      console.log(`Transaction was mined in block ${receipt.blockNumber}`);
    } catch (error) {
      console.log("unable to add liquidity");
      throw error;
    } finally {
      setPendingTxn(undefined);
    }
  };

  const approveIfInsufficientAllowance = async () => {
    if (!library) return;
    const signer = await library.getSigner(account);
    const sdaoToken = getErc20TokenById(Currencies.SDAO.id, { signer });

    const allowance = await sdaoToken.allowance(account, ContractAddress.UNISWAP);
    console.log("allowance", allowance.toString());
    if (allowance.lte(web3.utils.toWei(fromAmount, "gwei"))) {
      const txn = await sdaoToken.approve(ContractAddress.UNISWAP, defaultApprovalSDAO);
      setPendingTxn(txn.hash);
      await txn.wait();
      setPendingTxn(undefined);
    }
  };

  const handleClick = async () => {
    try {
      setAddingLiquidity(true);
      await approveIfInsufficientAllowance();
      await buyLiquidity();
      alert("Added liquidity Successfully");
    } catch (error) {
      alert("Errr: look console");
      console.log("errrrrrrrrrr", error);
    } finally {
      setAddingLiquidity(false);
    }
  };

  return (
    <Card className="p-4" style={{ borderRadius: 8 }}>
      <Typography color="text1" size={20} weight={600} className="d-flex justify-content-center">
        Add Liquidity
      </Typography>
      <CurrencyInputPanelLP
        onAmountChange={handleFromAmountChange}
        amount={fromAmount}
        selectedCurrency={fromCurrency}
      />

      <Typography className="d-flex justify-content-center">+</Typography>
      <CurrencyInputPanelLP onAmountChange={handleToAmountChange} amount={toAmount} selectedCurrency={toCurrency} />
      <GradientButton onClick={handleClick} disabled={!toAmount || addingLiquidity}>
        <span>Add Liquidity</span>
        {addingLiquidity ? <Spinner color="white" size="sm" className="ml-2" /> : null}
      </GradientButton>
      {pendingTxn ? (
        <Typography color="text1" className="mt-2">
          Pending:&nbsp;
          <a
            href={`https://${chainId === 1 ? "" : network.toLowerCase() + "."}etherscan.io/tx/${pendingTxn}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            {pendingTxn}
            <span className="ml-2">
              <i className="fas fa-external-link-alt"></i>
            </span>
          </a>
        </Typography>
      ) : null}
    </Card>
  );
};

export default AddLiquidityPanel;
