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
import { fetchEthBalance, fetchSDAOBalance, getGasPrice } from "../../utils/ethereum";
import { ContractAddress } from "../../assets/constants/addresses";
import { Spinner } from "reactstrap";

const FeeBlock = styled(Row)`
  border-top: ${({ theme }) => `1px solid ${theme.color.grayLight}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.color.grayLight}`};
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
  padding: 8px 0;
`;

const BuyPanel = ({ type, token, dynasetid }) => {
  const fromCurrency = "ETH";
  const toCurrency = "SDAO";

  const { library, account, network, chainId } = useUser();
  const [fromBalance, setFromBalance] = useState("0");
  const [toBalance, setToBalance] = useState("0");
  const [amounteth, setamountEth] = useState(0);
  // const [toCurrency, setToCurrency] = useState("AGI");
  const [toCurrencyPrice, setToCurrencyPrice] = useState("0");
  const [toAmount, setToAmount] = useState("0");
  const [fromAmount, setFromAmount] = useState("0");
  const [swapping, setSwapping] = useState(false);
  const [pendingTxn, setPendingTxn] = useState();

  const [fee, setFee] = useState(0);
  // const [amount, setAmount] = useState();

  useEffect(() => {
    getEthBalance();
    getSDAOBalance();
  }, [account]);

  // const changeprice = async (e) => {
  //   const DAI = new Token(ChainId.ROPSTEN, "0x5e94577b949a56279637ff74dfcff2c28408f049", 18);

  //   // note that you may want/need to handle this async code differently,
  //   // for example if top-level await is not an option
  //   const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId]);

  //   const route = new Route([pair], WETH[DAI.chainId]);

  //   const trade = new Trade(route, new TokenAmount(WETH[DAI.chainId], web3.utils.toWei(e)), TradeType.EXACT_INPUT);

  //   console.log("trade price");
  //   console.log(trade.executionPrice.invert().toSignificant(6));

  //   const price = e * trade.executionPrice.toSignificant(6);

  //   console.log(parseInt(price)); // 201.306

  //   // setamountEth(e);
  //   setFromAmount(e);
  //   // setToCurrencyPrice(price);
  //   setToAmount(price);

  //   console.log(route.midPrice.invert().toSignificant(6)); // 0.00496756
  // };

  const getTradeExecutionPrice = async (value) => {
    const DAI = new Token(ChainId.ROPSTEN, ContractAddress.DYNASET, 18);
    const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId]);
    const route = new Route([pair], WETH[DAI.chainId]);
    const trade = new Trade(
      route,
      new TokenAmount(WETH[DAI.chainId], web3.utils.toWei(value.toString())),
      TradeType.EXACT_INPUT
    );
    return trade.executionPrice.toSignificant(6);
  };

  const handleToAmountChange = async (value) => {
    console.log("value", value);
    if (value == 0) {
      setFromAmount(0);
      setToAmount(0);
      return;
    }
    setToAmount(value);
    setFromAmount("calculating...");
    const tradeExecutionPrice = await getTradeExecutionPrice(value);
    const price = value / tradeExecutionPrice;
    setFromAmount(price.toFixed(8));
  };

  const handleFromAmountChange = async (value) => {
    console.log("value", value);
    if (value == 0) {
      setFromAmount(0);
      setToAmount(0);
      return;
    }
    setFromAmount(value);
    setToAmount("calculating ...");
    const tradeExecutionPrice = await getTradeExecutionPrice(value);
    const price = value * tradeExecutionPrice;
    setToAmount(price.toFixed(8));
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

      //  const DAI = new Token(ChainId.ROPSTEN, dynasetid, 18);

      const DYN = new Token(ChainId.ROPSTEN, "0x5e94577b949a56279637ff74dfcff2c28408f049", 18);

      // note that you may want/need to handle this async code differently,
      // for example if top-level await is not an option
      const pair = await Fetcher.fetchPairData(DYN, WETH[DYN.chainId]);

      const route = new Route([pair], WETH[DYN.chainId]);

      console.log("route", route.path);

      const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

      console.log("From ", web3.utils.toWei(fromAmount.toString(), "ether", " ", fromCurrency));
      console.log("To ", web3.utils.toWei(toAmount, "gwei"), " ", toCurrency);

      const gasPrice = await getGasPrice();

      const tx = await uniswap.swapExactETHForTokens(
        web3.utils.toWei(toAmount.toString(), "gwei"),
        [route.path[0].address, route.path[1].address],
        account,
        deadline,
        {
          value: web3.utils.toWei(fromAmount.toString(), "ether"),
          gasPrice,
        }
      );
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

  const getEthBalance = async () => {
    console.log({ account, chainId, network });
    const etherBal = await fetchEthBalance(account, chainId, network);
    console.log({ etherBal });
    setFromBalance(etherBal || "0");
  };

  const getSDAOBalance = async () => {
    if (!library) return;
    const signer = await library.getSigner(account);
    const bal = await fetchSDAOBalance(account, signer);
    setToBalance(bal || "0");
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
        balance={fromBalance}
        currency={fromCurrency}
        onChange={handleFromAmountChange}
        label="From"
        value={fromAmount}
      />
      <div className="text-align-center">
        <img src={arrowDownIcon} className="my-3" />
      </div>
      <CurrencyInputPanel
        balance={toBalance}
        currency={toCurrency}
        onChange={handleToAmountChange}
        label="To"
        value={toAmount}
      />
      <FeeBlock>
        <Typography size={14}>Fee:</Typography>
        <Typography size={14}>{fee.toFixed(2)} ETH</Typography>
        <Typography size={14}>Slipage:</Typography>
        <Typography size={14}>{fee.toFixed(2)} ETH</Typography>
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
