import { useEffect, useState } from "react";
import styled from "styled-components";
import { Row, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from "reactstrap";
import CurrencyInputPanel from "./CurrencyInputPanel";
import arrowDownIcon from "../../assets/img/icons/arrow-down.png";
import Typography from "../Typography";

import { GradientButton } from "../Buttons";
import PropTypes from "prop-types";
import { useUser } from "../../components/UserContext";
import web3 from "web3";
import { ChainId, Token, WETH, Trade, TokenAmount, TradeType, Fetcher, Route, Percent } from "@uniswap/sdk";

import { ethers } from "ethers";
import IUniswapV2Router02ABI from "../../assets/constants/abi/IUniswapV2Router02.json";
import settingsIcon from "../../assets/img/icons/settings.svg";
import {
  addSlippage,
  defaultApprovalSDAO,
  defaultGasLimit,
  fetchEthBalance,
  fetchSDAOBalance,
  getGasPrice,
  reduceSlippage,
} from "../../utils/ethereum";
import { ContractAddress } from "../../assets/constants/addresses";
import { Spinner } from "reactstrap";
import { Currencies, getErc20TokenById, getUniswapToken } from "../../utils/currencies";

const FeeBlock = styled(Row)`
  border-top: ${({ theme }) => `1px solid ${theme.color.grayLight}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.color.grayLight}`};
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
  padding: 8px 0;
`;

const BuyPanel = () => {
  // STATES
  const { library, account, network, chainId } = useUser();
  const [toAmount, setToAmount] = useState("0");
  const [fromAmount, setFromAmount] = useState("0");
  const [swapping, setSwapping] = useState(false);
  const [pendingTxn, setPendingTxn] = useState();
  const [fromCurrency, setFromCurrency] = useState(Currencies.ETH.id);
  const [toCurrency, setToCurrency] = useState(Currencies.SDAO.id);
  const [fee, setFee] = useState(0);
  const slippage = 0.5;

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
    console.log("value", typeof value);
    // VALIDATION
    if (value == 0 || typeof value === undefined || value === "") {
      setFromAmount(value);
      if (toAmount > 0) setToAmount(0);
      return;
    }
    // CONVERSION
    setFromAmount(value);
    setToAmount("calculating ...");
    const rate = await getConversionRate(value, conversionTypes.FROM);
    const price = value * rate;
    setToAmount(price.toFixed(8));
  };

  const handleToAmountChange = async (value) => {
    // VALIDATION
    if (value == 0 || typeof value === undefined || value === "") {
      setToAmount(value);
      if (toAmount > 0) setFromAmount(0);
      return;
    }
    // CONVERSION
    setToAmount(value);
    setFromAmount("calculating...");
    const rate = await getConversionRate(value, conversionTypes.TO);
    const price = value / rate;
    setFromAmount(price.toFixed(8));
  };

  const validateSDAOAllowanceForUniswap = async () => {
    if (!library) return;
    const signer = await library.getSigner(account);
    const sdaoToken = getErc20TokenById(Currencies.SDAO.id, { signer });

    const allowance = await sdaoToken.allowance(account, ContractAddress.UNISWAP);

    if (allowance.lte(web3.utils.toWei(fromAmount, "gwei"))) {
      const txn = await sdaoToken.approve(ContractAddress.UNISWAP, defaultApprovalSDAO);
      setPendingTxn(txn.hash);
      await txn.wait();
      setPendingTxn(undefined);
    }
  };

  const handleSwapping = async () => {
    if (!library) return;
    try {
      setSwapping(true);
      const signer = await library.getSigner(account);

      const uniswap = new ethers.Contract(
        "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
        IUniswapV2Router02ABI.abi,
        signer
      );

      const DYN = new Token(ChainId.ROPSTEN, "0x5e94577b949a56279637ff74dfcff2c28408f049", 18);

      const pair = await Fetcher.fetchPairData(DYN, WETH[DYN.chainId]);

      const route = new Route([pair], WETH[DYN.chainId]);

      console.log("route", route.path);

      const gasPrice = await getGasPrice();

      let operation;
      let args = [];
      let value;
      if (fromCurrency === Currencies.ETH.id) {
        operation = uniswap.swapExactETHForTokens;
        console.log("reduceSlippage(toAmount)", reduceSlippage(toAmount))
        const amountOutMin = web3.utils.toWei(reduceSlippage(toAmount), "gwei");
        const path = [route.path[0].address, route.path[1].address];
        const to = account;
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
        args = [amountOutMin, path, to, deadline];
        value = web3.utils.toWei(fromAmount.toString(), "ether");
      } else {
        await validateSDAOAllowanceForUniswap();
        operation = uniswap.swapTokensForExactETH;
        console.log("addSlippage(fromAmount)", addSlippage(fromAmount), typeof addSlippage(fromAmount))
        const amountOut = web3.utils.toWei(toAmount.toString(), "ether");
        const amountInMax = web3.utils.toWei("100000000000", "gwei"); //addSlippage(fromAmount)
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
      alert(`Transaction was mined in block ${receipt.blockNumber}`);
    } catch (error) {
      alert("something went wrong");
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
    setFromAmount("0");
    setToAmount("0");
  };

  const handleToCurrencyChange = (value) => {
    if (value === toCurrency) return;
    setFromCurrency(toCurrency);
    setToCurrency(value);
    setFromAmount("0");
    setToAmount("0");
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <Typography size={20} style={{ textAlign: "left" }}>
          Swap
        </Typography>
        <img src={settingsIcon} />
      </div>
      <CurrencyInputPanel
        onAmountChange={handleFromAmountChange}
        label="From"
        amount={fromAmount}
        selectedCurrency={fromCurrency}
        setSelectedCurrency={handleFromCurrencyChange}
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
      />
      <FeeBlock>
        <Typography size={14}>Fee:</Typography>
        <Typography size={14}>{fee.toFixed(2)} ETH</Typography>
        <Typography size={14}>Slippage:</Typography>
        <Typography size={14}>{slippage.toFixed(2)} %</Typography>
      </FeeBlock>

      <div className="d-flex justify-content-center">
        <GradientButton onClick={handleSwapping} disabled={swapping}>
          <span>Swap</span>
          {swapping ? <Spinner color="white" size="sm" className="ml-2" /> : null}
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
