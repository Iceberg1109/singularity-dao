import React, { useCallback, useEffect, useState } from "react";
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
import { defaultGasLimit, getGasPrice, defaultApprovalSDAO, unitBlockTime } from "../../utils/ethereum";
import { abi as IUniswapV2Router02ABI } from "../../assets/constants/abi/IUniswapV2Router02.json";
import { Currencies, getErc20TokenById, getUniswapToken } from "../../utils/currencies";
import { toast } from "react-toastify";
import { sanitizeNumber } from "../../utils/input";
import useInterval from "../../utils/hooks/useInterval";
import BigNumber from "bignumber.js";
import { useTokenDetails } from "../../utils/hooks/useTokenDetails";
import { fromFraction, toFraction } from "../../utils/balance";

const fromCurrency = Currencies.SDAO.id;
const toCurrency = Currencies.ETH.id;

const conversionTypes = { FROM: "FROM", TO: "TO" };

const memoizedRoute = {};
const setMemoizedRoute = (fromAddress, toAddress, value) => (memoizedRoute[`${fromAddress}_${toAddress}`] = value);
const getMemoizedRoute = (fromAddress, toAddress) => memoizedRoute[`${fromAddress}_${toAddress}`];

const AddLiquidityPanel = ({ tokens }) => {
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const { library, account, network, chainId } = useUser();
  const [pendingTxn, setPendingTxn] = useState();
  const [addingLiquidity, setAddingLiquidity] = useState(false);
  const [approving, setApproving] = useState(false);
  const [swappingRoute, setSwappingRoute] = useState(undefined);
  const [fromTokenAllowance, setFromTokenAllowance] = useState("0");
  const {
    loading: token0Loading,
    data: token0Data,
    error: token0Error,
  } = useTokenDetails(tokens ? tokens[0] : "", account, library);
  console.log({ token0Loading, token0Data, token0Error });
  // const {
  //   loading: token1Loading,
  //   data: token1Data,
  //   error: token1Error,
  // } = useTokenDetails(tokens ? tokens[1] : "", account, library);
  // console.log({ token1Loading, token1Data, token1Error });

  useEffect(async () => {
    const route = await getSwappingRoute();
    setSwappingRoute(route);
  }, []);

  useEffect(async () => {
    setSwappingRoute(undefined);
    const route = await getSwappingRoute();
    setSwappingRoute(route);
  }, [fromCurrency, toCurrency]);

  useInterval(() => updateFromTokenAllowance(), unitBlockTime, [account, fromCurrency]);

  const updateFromTokenAllowance = async () => {
    if (!account || fromCurrency === Currencies.ETH.id) return;
    if (!library) return;
    const signer = await library.getSigner(account);
    const fromToken = getErc20TokenById(fromCurrency, { signer });

    const allowance = await fromToken.allowance(account, ContractAddress.UNISWAP);
    setFromTokenAllowance(allowance.toString());
  };

  const getTokens = useCallback(() => {
    const fromToken = getUniswapToken(fromCurrency);
    const toToken = getUniswapToken(toCurrency);
    return { fromToken, toToken };
  }, [fromCurrency, toCurrency]);

  const getSwappingRoute = async () => {
    const { fromToken, toToken } = getTokens();
    const memo = getMemoizedRoute(fromToken.address, toToken.address);
    if (memo) return memo;
    const pair = await Fetcher.fetchPairData(fromToken, toToken);
    const route = new Route([pair], fromToken);
    setMemoizedRoute(fromToken.address, toToken.address, route);
    return route;
  };

  const getConversionRate = async (value, type = conversionTypes.FROM) => {
    if (!swappingRoute) return;

    const { fromToken, toToken } = getTokens();
    const tradeToken = type === conversionTypes.FROM ? fromToken : toToken;
    const tradeType = type === conversionTypes.FROM ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT;

    const trade = new Trade(swappingRoute, new TokenAmount(tradeToken, web3.utils.toWei(value.toString())), tradeType);
    console.log("new trade price", trade.executionPrice.toSignificant(6));
    return trade.executionPrice.toSignificant(6);
  };

  const handleFromAmountChange = async (value) => {
    value = sanitizeNumber(value);
    if (!value) return resetAmounts();
    setFromAmount(value);
    setToAmount("Calculating ...");
    const tradeExecutionPrice = await getConversionRate(value, conversionTypes.FROM);
    const price = value * tradeExecutionPrice;
    setToAmount(price);
  };

  const handleToAmountChange = async (value) => {
    value = sanitizeNumber(value);
    if (!value) return resetAmounts();
    setToAmount(value);
    setFromAmount("Calculating ...");
    const tradeExecutionPrice = await getConversionRate(value, conversionTypes.TO);
    const price = value / tradeExecutionPrice;
    setFromAmount(price);
  };

  const resetAmounts = () => {
    setFromAmount("0");
    setToAmount("0");
  };

  const approveTokens = async () => {
    try {
      if (!library) return;
      const signer = await library.getSigner(account);
      const fromToken = getErc20TokenById(fromCurrency, { signer });

      setApproving(true);
      const txn = await fromToken.approve(ContractAddress.UNISWAP, defaultApprovalSDAO);
      setPendingTxn(txn.hash);
      await txn.wait();
      setPendingTxn(undefined);
      updateFromTokenAllowance();
      toast("Approval success: Please confirm the swap now", { type: "success" });
    } catch (error) {
      toast(`Failed to Approve: ${error.message}`, { type: "error" });
      throw error;
    } finally {
      setApproving(false);
    }
  };

  const buyLiquidity = async () => {
    try {
      if (!token0Data) return;
      console.log("Adding ", web3.utils.toWei(toAmount.toString(), "ether"), " ", toCurrency, " to liquidity pool");
      const signer = await library.getSigner(account);
      const uniswap = new ethers.Contract(ContractAddress.UNISWAP, IUniswapV2Router02ABI, signer);
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
      const gasPrice = await getGasPrice();

      // const amountTokenDesired = web3.utils.toWei(fromAmount.toString(), "ether");
      // console.log("amountTokenDesired", amountTokenDesired);

      const amountTokenDesired = fromFraction(fromAmount.toString(), token0Data.decimals);
      console.log("fractAmount", amountTokenDesired);

      const slippage = Currencies.SDAO.slippagePercent;
      const slippageMulFactor = 1 - slippage / 100;
      const amountTokenMin = ethers.BigNumber.from(amountTokenDesired) * slippageMulFactor;
      const amountETHMin = web3.utils.toWei(toAmount.toString(), "ether");
      const tx = await uniswap.addLiquidityETH(token0Data.address, amountTokenDesired, "0", "0", account, deadline, {
        gasLimit: defaultGasLimit,
        gasPrice,
        value: web3.utils.toWei(toAmount.toString()),
      });
      setPendingTxn(tx.hash);
      console.log(`Transaction hash: ${tx.hash}`);
      const receipt = await tx.wait();
      console.log(`Transaction was mined in block ${receipt.blockNumber}`);
      toast(`Transaction was mined in block ${receipt.blockNumber}`, { type: "success" });
    } catch (error) {
      console.log("unable to add liquidity");
      throw error;
    } finally {
      setPendingTxn(undefined);
    }
  };

  const approveIfInsufficientAllowance = async () => {
    if (!token0Data) return;
    // if (!library) return;
    const signer = await library.getSigner(account);
    const sdaoToken = getErc20TokenById(Currencies.SDAO.id, { signer });

    const allowance = await token0Data.contract.allowance(account, ContractAddress.UNISWAP);
    console.log("allowance", allowance.toString());
    console.log("wei Amount", fromFraction(fromAmount, token0Data.decimals));
    if (allowance.lte(web3.utils.toWei(fromAmount, "gwei"))) {
      const txn = await sdaoToken.approve(ContractAddress.UNISWAP, defaultApprovalSDAO);
      setPendingTxn(txn.hash);
      await txn.wait();
      setPendingTxn(undefined);
      toast("Approval success: Please confirm the add-liquidity now");
    }
  };

  const handleClick = async () => {
    try {
      setAddingLiquidity(true);
      await approveIfInsufficientAllowance();
      await buyLiquidity();
      resetAmounts();
    } catch (error) {
      toast(`Operation Failed: ${error.message}`, { type: "error" });
      console.log("errrrrrrrrrr", error);
    } finally {
      setAddingLiquidity(false);
    }
  };

  const showApproval = () => {
    if (fromCurrency === Currencies.ETH.id || !sanitizeNumber(fromAmount) || isNaN(sanitizeNumber(fromAmount)))
      return false;
    const allowance = BigNumber(fromTokenAllowance);
    const amount = BigNumber(web3.utils.toWei(sanitizeNumber(fromAmount), "ether"));
    return allowance.comparedTo(amount) !== 1;
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
        disabled={!swappingRoute}
        token={tokens ? tokens[0] : ""}
      />

      <Typography className="d-flex justify-content-center">+</Typography>
      <CurrencyInputPanelLP
        onAmountChange={handleToAmountChange}
        amount={toAmount}
        selectedCurrency={toCurrency}
        disabled={!swappingRoute}
        token={tokens ? tokens[1] : ""}
      />
      {showApproval() ? (
        <div className="d-flex justify-content-center">
          <GradientButton
            onClick={approveTokens}
            disabled={!toAmount || addingLiquidity || approving}
            style={{ width: 186, height: 56 }}
            className="d-flex align-middle justify-content-center"
          >
            <span style={{ lineHeight: "40px" }}>Approve</span>
            {approving ? (
              <span style={{ lineHeight: "35px" }}>
                <Spinner color="white" size="sm" className="ml-2" />
              </span>
            ) : null}
          </GradientButton>
        </div>
      ) : null}
      <div className="d-flex justify-content-center mt-4">
        <GradientButton
          onClick={handleClick}
          disabled={!toAmount || toAmount <= 0 || addingLiquidity || approving || showApproval() || token0Loading}
          style={{ width: addingLiquidity ? 212 : 186, height: 56 }}
          className="d-flex align-middle justify-content-center"
        >
          <span style={{ lineHeight: "40px" }}>Add Liquidity</span>
          {addingLiquidity ? (
            <span style={{ lineHeight: "35px" }}>
              <Spinner color="white" size="sm" className="ml-2" />
            </span>
          ) : null}
        </GradientButton>
      </div>
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
