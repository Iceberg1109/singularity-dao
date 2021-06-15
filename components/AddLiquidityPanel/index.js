import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";
import Typography from "components/Typography";
import { GradientButton } from "components/Buttons";
import CurrencyInputPanelSDAO from "../../components/CurrencyInputPanelLP";
import { ContractAddress } from "../../assets/constants/addresses";
import { ChainId, Token, WETH, Trade, TokenAmount, TradeType, Fetcher, Route, Percent } from "@uniswap/sdk";
import { abi as DynasetABI } from "../../assets/constants/abi/Dynaset.json";
import web3 from "web3";
import { useUser } from "../UserContext";
import { ethers } from "ethers";
import axios from "axios";
import { defaultGasLimit, fetchEthBalance, getGasPrice } from "../../utils/ethereum";
import { abi as IUniswapV2Router02ABI } from "../../assets/constants/abi/IUniswapV2Router02.json";

const etherscanBaseAPI = {};

const AddLiquidityPanel = () => {
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [toBalance, setToBalance] = useState("0");
  const [fromBalance, setFromBalance] = useState("0");
  const [fromCurrency] = useState("ETH");
  const [toCurrency] = useState("SDAO");
  const { library, account, network, chainId } = useUser();

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

  useEffect(() => {
    getEthBalance();
    getSDAOBalance();
  }, [account, chainId]);

  const handleFromAmountChange = async (value) => {
    console.log("value", value);
    if (value == 0) {
      setFromAmount(0);
      setToAmount(0);
      return;
    }
    const tradeExecutionPrice = await getTradeExecutionPrice(value);
    const price = value * tradeExecutionPrice;
    setFromAmount(value);
    setToAmount(price);
  };

  const handleToAmountChange = async (value) => {
    console.log("value", value);
    if (value == 0) {
      setFromAmount(0);
      setToAmount(0);
      return;
    }
    const tradeExecutionPrice = await getTradeExecutionPrice(value);
    const price = value / tradeExecutionPrice;
    setFromAmount(price);
    setToAmount(value);
  };

  const getEthBalance = async () => {
    // if (!account) return;

    // let etherscanAPI =
    //   chainId === 1 ? "https://api.etherscan.io/api" : `https://api-${network.toLowerCase()}.etherscan.io/api`;

    // const response = await axios.get(
    //   `${etherscanAPI}?module=account&action=balance&address=${account}&tag=latest&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
    // );
    // const etherBal = web3.utils.fromWei(response.data.result);
    const etherBal = await fetchEthBalance(account, chainId, network)
    setFromBalance(etherBal);
  };

  const getSDAOBalance = async () => {
    if (!account || !library) return;
    // DYNASET BALANCE
    const signer = await library.getSigner(account);
    const tokenContract = new ethers.Contract(ContractAddress.DYNASET, DynasetABI, signer);
    const balance = await tokenContract.balanceOf(account);

    setToBalance(web3.utils.fromWei(balance.toString()));
  };

  const approveLiquidity = async () => {
    const signer = await library.getSigner(account);
    const tokenContract = new ethers.Contract(ContractAddress.DYNASET, DynasetABI, signer);
    const amountToBeApproved = web3.utils.toWei(toAmount.toString());
    const gasPrice = await getGasPrice();
    const tx = await tokenContract.approve(ContractAddress.UNISWAP, amountToBeApproved, {
      gasLimit: defaultGasLimit,
      gasPrice,
    });
    console.log(`Transaction hash: ${tx.hash}`);
    const receipt = await tx.wait();
    console.log(`Approved ${amountToBeApproved} for staking`);
    console.log(`Transaction was mined in block ${receipt.blockNumber}`);
  };

  const buyLiquidity = async () => {
    console.log("Adding ", web3.utils.toWei(toAmount.toString(), "ether"), " ", toCurrency, " to liquidity pool");
    const signer = await library.getSigner(account);
    const uniswap = new ethers.Contract(ContractAddress.UNISWAP, IUniswapV2Router02ABI, signer);
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
    const gasPrice = await getGasPrice();
    const tx = await uniswap.addLiquidityETH(
      ContractAddress.DYNASET,
      web3.utils.toWei(toAmount.toString(), "ether"),
      "0",
      "0",
      account,
      deadline,
      {
        gasLimit: defaultGasLimit,
        gasPrice,
        value: web3.utils.toWei(fromAmount.toString()),
      }
    );
    console.log(`Transaction hash: ${tx.hash}`);
    const receipt = await tx.wait();
    console.log(`Transaction was mined in block ${receipt.blockNumber}`);
  };

  const handleClick = async () => {
    try {
      await approveLiquidity();
      await buyLiquidity();
    } catch (error) {
      alert("Errr: look console");
      console.log("errrrrrrrrrr", error);
    }
  };

  return (
    <Card className="p-4" style={{ borderRadius: 8 }}>
      <Typography color="text1" size={20} weight={600} className="d-flex justify-content-center">
        Add Liquidity
      </Typography>
      <CurrencyInputPanelSDAO
        label={fromCurrency}
        balance={`${fromBalance} ${fromCurrency}`}
        onChange={handleFromAmountChange}
        toCurrencyPrice={fromAmount}
      />
      <Typography className="d-flex justify-content-center">+</Typography>
      <CurrencyInputPanelSDAO
        label={toCurrency}
        balance={`${toBalance} ${toCurrency}`}
        onChange={handleToAmountChange}
        toCurrencyPrice={toAmount}
      />
      <GradientButton onClick={handleClick} disabled={!toAmount}>
        Add Liquidity
      </GradientButton>
    </Card>
  );
};

export default AddLiquidityPanel;
