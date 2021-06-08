import { useState } from "react";
import styled from "styled-components";
import { Row, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from "reactstrap";
import CurrencyInputPanel from "../../components/CurrencyInputPanelDropDown";
import CurrencyInputPanelSDAO from "../../components/CurrencyInputPanelSDAO";
import arrowDownIcon from "../../assets/img/icons/arrow-down.png";
import Typography from "../Typography";

import { GradientButton } from "../Buttons";
import PropTypes from "prop-types";
import { useUser } from "../../components/UserContext";
import web3 from "web3";
import { ChainId, Token, WETH, Trade, TokenAmount, TradeType, Fetcher, Route, Percent } from "@uniswap/sdk";

import { ethers } from "ethers";
import IUniswapV2Router02ABI from "../../assets/constants/abi/IUniswapV2Router02.json";

const FeeBlock = styled(Row)`
  border-top: ${({ theme }) => `1px solid ${theme.color.grayLight}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.color.grayLight}`};
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
  padding: 8px 0;
`;

const AddLiquidityPanel = ({ type, token, dynasetid }) => {
  const [fromCurrency, setFromCurrency] = useState("ETH");
  const [balance, setBalance] = useState(0);
  const [amounteth, setamountEth] = useState(0);
  const [toCurrency, setToCurrency] = useState("AGI");
  const [toCurrencyPrice, setToCurrencyPrice] = useState(0);

  const [fee, setFee] = useState(0);
  const [amount, setAmount] = useState();
  const { library, account } = useUser();

  const changeprice = async (e) => {
    const DAI = new Token(ChainId.ROPSTEN, "0x5e94577b949a56279637ff74dfcff2c28408f049", 18);

    // note that you may want/need to handle this async code differently,
    // for example if top-level await is not an option
    const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId]);

    const route = new Route([pair], WETH[DAI.chainId]);

    const trade = new Trade(route, new TokenAmount(WETH[DAI.chainId], web3.utils.toWei(e)), TradeType.EXACT_INPUT);

    console.log("trade price");
    console.log(trade.executionPrice.invert().toSignificant(6));

    const price = e * trade.executionPrice.toSignificant(6);

    console.log(parseInt(price)); // 201.306

    setamountEth(e);
    setToCurrencyPrice(price);

    console.log(route.midPrice.invert().toSignificant(6)); // 0.00496756
  };

  const buy = async () => {
    const signer = await library.getSigner(account);

    const uniswap = new ethers.Contract(
      "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
      IUniswapV2Router02ABI.abi,
      signer
    );

    const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

    console.log(web3.utils.toWei(toCurrencyPrice.toString(), "gwei"));
    console.log(web3.utils.toWei(amounteth.toString(), "ether"));

    const tx = await uniswap.addLiquidityETH(
      "0x5e94577b949a56279637ff74dfcff2c28408f049",
      web3.utils.toWei(toCurrencyPrice.toString(), "ether"),
      "0",
      "0",
      account,
      deadline,
      {
        gasLimit: web3.utils.toWei("30000", "wei"),
        gasPrice: web3.utils.toWei("7000", "gwei"),
        value: web3.utils.toWei(amounteth.toString()),
      }
    );

    console.log(`Transaction hash: ${tx.hash}`);

    const receipt = await tx.wait();

    console.log(`Transaction was mined in block ${receipt.blockNumber}`);
  };

  return (
    <>
      <Typography size={20} style={{ textAlign: "left" }}>
        Liquidity
      </Typography>

      <CurrencyInputPanel balance={balance} currency={fromCurrency} onChange={changeprice} label="From" />

      {type && (
        <Typography>
          {amounteth} {fromCurrency} = {toCurrencyPrice} {token}
        </Typography>
      )}

      <CurrencyInputPanelSDAO balance={toCurrencyPrice} currency={token} label="To" />

      <GradientButton onClick={buy}>Add Liquidity {token}</GradientButton>
    </>
  );
};

AddLiquidityPanel.propTypes = {
  type: PropTypes.bool,
};

AddLiquidityPanel.defaultProps = {
  // If true, it means that it is the buy panel. If false, it is the swap panel.
  type: true,
};

export default AddLiquidityPanel;
