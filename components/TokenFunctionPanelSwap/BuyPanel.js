import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Row } from "reactstrap";
import CurrencyInputPanel from "./CurrencyInputPanel";
import arrowDownIcon from "../../assets/img/icons/arrow-down.png";
import Typography from "../Typography";

import { GradientButton } from "../Buttons";
import PropTypes from "prop-types";
import { useUser } from "../../components/UserContext";
import web3 from "web3";
import { ChainId, Token, WETH, Trade, TokenAmount, TradeType, Fetcher, Route } from "@uniswap/sdk";

import { ethers } from "ethers";
import IUniswapV2Router02ABI from "../../assets/constants/abi/IUniswapV2Router02.json";
import {
  addSlippage,
  defaultApprovalAmount,
  defaultGasLimit,
  getGasPrice,
  reduceSlippage,
  unitBlockTime,
} from "../../utils/ethereum";
import { ContractAddress } from "../../assets/constants/addresses";
import { Spinner } from "reactstrap";
import { Currencies, getErc20TokenById, getUniswapToken } from "../../utils/currencies";

import SwapSuccessModal from "./SwapSuccessModal";
import { useQuery } from "@apollo/client";
import { ETH_PRICE_QUERY } from "../../queries/price";
import { toast } from "react-toastify";
import { sanitizeNumber } from "../../utils/input";
import useInterval from "../../utils/hooks/useInterval";
import BigNumber from "bignumber.js";
import PendingTxn from "../PendingTxn";
import { fromFraction } from "../../utils/balance";

const FeeBlock = styled(Row)`
  border-top: ${({ theme }) => `1px solid ${theme.color.grayLight}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.color.grayLight}`};
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
  padding: 8px 0;
`;

const memoizedRoute = {};
const setMemoizedRoute = (fromAddress, toAddress, value) => (memoizedRoute[`${fromAddress}_${toAddress}`] = value);
const getMemoizedRoute = (fromAddress, toAddress) => memoizedRoute[`${fromAddress}_${toAddress}`];

const slippage = 0.5;
const fee = 0.3;

const BuyPanel = () => {
  // STATES
  const { library, account, network, chainId } = useUser();
  const [toAmount, setToAmount] = useState("0");
  const [fromAmount, setFromAmount] = useState("0");
  const [swapping, setSwapping] = useState(false);
  const [approving, setApproving] = useState(false);
  const [pendingTxn, setPendingTxn] = useState(undefined);
  const [fromCurrency, setFromCurrency] = useState(Currencies.ETH.id);
  const [toCurrency, setToCurrency] = useState(Currencies.SDAO.id);
  const [fromTokenAllowance, setFromTokenAllowance] = useState("0");
  const [conversionRate, setConversionRate] = useState(undefined);
  const slippage = 0.5;
  const fee = 0.3;
  const [swappingRoute, setSwappingRoute] = useState(undefined);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { data } = useQuery(ETH_PRICE_QUERY);

  const conversionTypes = {
    FROM: "FROM",
    TO: "TO",
  };

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

  const getConversionRate = (value, type = conversionTypes.FROM) => {
    if (!swappingRoute) return 0;
    if (isNaN(Number(value))) return 0;
    const { fromToken, toToken } = getTokens();
    const tradeToken = type === conversionTypes.FROM ? fromToken : toToken;
    const tradeType = type === conversionTypes.FROM ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT;

    const fromValue = fromFraction(value, 18, 0);
    if (BigNumber(fromValue).isZero()) return 0;

    const trade = new Trade(swappingRoute, new TokenAmount(tradeToken, fromValue), tradeType);
    console.log("trade.executionPrice", trade.executionPrice.toSignificant(6));
    setConversionRate(trade.executionPrice.toSignificant(6));
    return trade.executionPrice.toSignificant(6);
  };

  const updateFromTokenAllowance = async () => {
    if (!account || fromCurrency === Currencies.ETH.id) return;
    if (!library) return;
    const signer = await library.getSigner(account);
    const fromToken = getErc20TokenById(fromCurrency, { signer });

    const allowance = await fromToken.allowance(account, ContractAddress.UNISWAP);
    setFromTokenAllowance(allowance.toString());
  };

  const handleFromAmountChange = async (value) => {
    value = sanitizeNumber(value);
    // VALIDATION

    if (!value) return resetAmounts();
    if (value === ".") return setFromAmount("0.");
    if (`${value}`.charAt(0) === ".") {
      value = `0${value}`;
    }
    // CONVERSION
    setFromAmount(value);
    setToAmount("calculating ...");
    const rate = await getConversionRate(value, conversionTypes.FROM);
    const price = value * rate;
    setToAmount(price.toFixed(8));
  };

  const handleToAmountChange = async (value) => {
    value = sanitizeNumber(value);
    // VALIDATION

    if (!value) return resetAmounts();
    if (value === ".") return setToAmount("0.");
    if (`${value}`.charAt(0) === ".") {
      value = `0${value}`;
    }
    // CONVERSION
    setToAmount(value);
    setFromAmount("calculating...");
    const rate = await getConversionRate(value, conversionTypes.TO);
    const price = value / rate;
    setFromAmount(price.toFixed(18));
  };

  const approveTokens = async () => {
    try {
      if (!library) return;
      const signer = await library.getSigner(account);
      const fromToken = getErc20TokenById(fromCurrency, { signer });

      setApproving(true);
      const txn = await fromToken.approve(ContractAddress.UNISWAP, defaultApprovalAmount);
      setPendingTxn(txn.hash);
      await txn.wait();
      setPendingTxn(undefined);
      toast("Approval success: Please confirm the swap now");
    } catch (error) {
      throw error;
    } finally {
      setApproving(false);
    }
  };

  const validateSDAOAllowanceForUniswap = async () => {
    if (!library) return;
    const signer = await library.getSigner(account);
    const sdaoToken = getErc20TokenById(Currencies.SDAO.id, { signer });

    const allowance = await sdaoToken.allowance(account, ContractAddress.UNISWAP);
    if (allowance.lte(web3.utils.toWei(fromAmount, "ether"))) {
      await approveTokens();
    }
  };

  const handleSwapping = async () => {
    try {
      // VALIDATION
      if (isNaN(Number(fromAmount)) || isNaN(Number(toAmount))) {
        throw new Error("Invalid Input values");
      }
      // SWAPPING
      if (!library) return;
      setSwapping(true);
      const signer = await library.getSigner(account);

      const uniswap = new ethers.Contract(ContractAddress.UNISWAP, IUniswapV2Router02ABI.abi, signer);

      const DYN = new Token(ChainId.ROPSTEN, "0x5e94577b949a56279637ff74dfcff2c28408f049", 18);

      const pair = await Fetcher.fetchPairData(DYN, WETH[DYN.chainId]);

      const route = new Route([pair], WETH[DYN.chainId]);

      console.log("route", route.path);

      const gasPrice = await getGasPrice();

      console.log("deadline", Math.floor(Date.now() / 1000) + 60 * 20);

      let operation;
      let args = [];
      let value;
      if (fromCurrency === Currencies.ETH.id) {
        operation = uniswap.swapExactETHForTokens;
        const amountOutMin = fromFraction(reduceSlippage(toAmount), 9, 0); // 9 decimals for gwei
        const path = [route.path[0].address, route.path[1].address];
        const to = account;
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
        args = [amountOutMin, path, to, deadline];
        value = fromFraction(fromAmount, 18, 0)
      } else {
        await validateSDAOAllowanceForUniswap();
        operation = uniswap.swapTokensForExactETH;
        const amountOut = web3.utils.toWei(toAmount.toString(), "ether");
        const amountInMax = web3.utils.toWei(addSlippage(fromAmount), "ether"); // using ether for proper decimals
        const path = [route.path[1].address, route.path[0].address];
        const to = account;
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

        args = [amountOut, amountInMax, path, to, deadline];
      }

      const tx = await operation(...args, { gasLimit: defaultGasLimit, gasPrice, value });
      console.log(`Transaction hash: ${tx.hash}`);
      setPendingTxn(tx.hash);
      const receipt = await tx.wait();
      console.log(`Transaction was mined in block ${receipt.blockNumber}`);
      toast(`Transaction was mined in block ${receipt.blockNumber}`, { type: "success" });
      setShowSuccessModal(true);
    } catch (error) {
      toast(`Operation Failed: ${error.message}`, { type: "error" });
      console.log("error", error);
    } finally {
      setSwapping(false);
      setPendingTxn(undefined);
    }
  };

  const handleFromCurrencyChange = (value) => {
    if (value === fromCurrency) return;
    setToCurrency(fromCurrency);
    setFromCurrency(value);
    resetAmounts();
  };

  const handleToCurrencyChange = (value) => {
    if (value === toCurrency) return;
    setFromCurrency(toCurrency);
    setToCurrency(value);
    resetAmounts();
  };

  const resetAmounts = () => {
    setFromAmount("0");
    setToAmount("0");
  };

  const handleModalClose = () => {
    resetAmounts();
    setShowSuccessModal(false);
  };

  const getUSDValue = useCallback(() => {
    const ethPriceInUSD = data?.bundles[0]?.ethPrice;
    const eth = fromCurrency === Currencies.ETH.id ? Number(fromAmount) : Number(toAmount);
    const usdValue = eth * Number(ethPriceInUSD);
    if (isNaN(usdValue)) return undefined;
    return usdValue.toFixed(4);
  }, [fromCurrency, toCurrency, fromAmount, toAmount]);

  const showApproval = () => {
    if (fromCurrency === Currencies.ETH.id || !sanitizeNumber(fromAmount) || isNaN(sanitizeNumber(fromAmount)))
      return false;
    const allowance = BigNumber(fromTokenAllowance);
    if (allowance.isZero()) return true;
    const amount = BigNumber(web3.utils.toWei(sanitizeNumber(fromAmount), "ether"));
    return allowance.comparedTo(amount) !== 1;
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <Typography size={20} style={{ textAlign: "left" }}>
          Swap
        </Typography>
      </div>
      <CurrencyInputPanel
        onAmountChange={handleFromAmountChange}
        label="From"
        amount={fromAmount}
        selectedCurrency={fromCurrency}
        setSelectedCurrency={handleFromCurrencyChange}
        disabled={!swappingRoute}
        USDValue={getUSDValue()}
      />
      <div className="text-align-center" role="button" onClick={() => handleFromCurrencyChange(toCurrency)}>
        <img src={arrowDownIcon} className="my-3" />
      </div>
      <CurrencyInputPanel
        onAmountChange={handleToAmountChange}
        label="To"
        amount={toAmount}
        selectedCurrency={toCurrency}
        onCurrencyChange={handleToCurrencyChange}
        USDValue={getUSDValue()}
      />
      <FeeBlock>
        <Typography size={14}>Fee:</Typography>
        <Typography size={14}>{fee.toFixed(2)} %</Typography>
        <Typography size={14}>Slippage:</Typography>
        <Typography size={14}>{slippage.toFixed(2)} %</Typography>
      </FeeBlock>
      {showApproval() ? (
        <div className="d-flex justify-content-center">
          <GradientButton onClick={approveTokens} disabled={swapping || approving} style={{ width: 180, height: 56 }}>
            Approve
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
          onClick={handleSwapping}
          disabled={swapping || approving || showApproval()}
          style={{ width: 130, height: 56 }}
          className="d-flex align-middle justify-content-center"
        >
          <span style={{ lineHeight: "40px" }}>Swap</span>
          {swapping ? (
            <span style={{ lineHeight: "35px" }}>
              <Spinner color="white" size="sm" className="ml-2" />
            </span>
          ) : null}
        </GradientButton>
      </div>
      <PendingTxn txn={pendingTxn} />
      <SwapSuccessModal
        modalOpen={showSuccessModal}
        setModalOpen={handleModalClose}
        title="Swap Successful!"
        itemsList={[
          { label: "Swapped", desc: `${fromAmount} ${fromCurrency.toUpperCase()}` },
          { label: "Slippage", desc: `${slippage.toFixed(2)} %` },
        ]}
        resultsList={[{ label: "Received", desc: `${toAmount} ${toCurrency.toUpperCase()}` }]}
        primaryAction={{ label: "Ok", onClick: handleModalClose }}
      />
    </>
  );
};

BuyPanel.propTypes = {
  type: PropTypes.bool,
};

BuyPanel.defaultProps = {
  // If true, it means that it is the buy panel. If false, it is the swap panel.
  type: true,
};

export default BuyPanel;
