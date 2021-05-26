import { useState } from "react";
import styled from "styled-components";
import { Row } from "reactstrap";
import CurrencyInputPanel from "../../components/CurrencyInputPanel";
import arrowDownIcon from "../../assets/img/icons/arrow-down.png";
import Typography from "../Typography";
import { GradientButton } from "../Buttons";
import PropTypes from "prop-types";
import {useUser} from '../../components/UserContext';
import web3 from 'web3';
import { ChainId, Token, WETH,Trade,TokenAmount, TradeType, Fetcher, Route,Percent } from '@uniswap/sdk'

import {ethers} from 'ethers';
import UniswapReceipeABI from '../../assets/constants/abi/UniswapReceipe.json';

const FeeBlock = styled(Row)`
  border-top: ${({ theme }) => `1px solid ${theme.color.grayLight}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.color.grayLight}`};
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
  padding: 8px 0;
`;

const BuyPanel = ({ type,token,dynasetid }) => {
  const [fromCurrency, setFromCurrency] = useState("ETH");
  const [balance, setBalance] = useState(0);
  const [amounteth,setamountEth] = useState(0);
  const [toCurrency, setToCurrency] = useState("AGI");
  const [toCurrencyPrice, setToCurrencyPrice] = useState(0);

  const [fee, setFee] = useState(0);
  const [amount,setAmount] = useState();
  const {library, account} = useUser();


  const changeprice  = async (e) => {

       const DAI = new Token(ChainId.ROPSTEN, dynasetid , 18)

      // note that you may want/need to handle this async code differently,
      // for example if top-level await is not an option
      const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId])

      const route = new Route([pair], WETH[DAI.chainId])

      const trade = new Trade(route, new TokenAmount(WETH[DAI.chainId], web3.utils.toWei(e)), TradeType.EXACT_INPUT)

      console.log("trade price")
      console.log(trade.executionPrice.invert().toSignificant(6))
  

      const price = e *trade.executionPrice.toSignificant(6);

      console.log(parseInt(price)) // 201.306

      setamountEth(e)
      setToCurrencyPrice(price)

      console.log(route.midPrice.invert().toSignificant(6)) // 0.00496756

  
  }

  const mintwithEth = async () => {

    const signer = await library.getSigner(account);

    const uniswap_receipe = new ethers.Contract(
      "0x37E32DbF68E326f69466255773e912aFC3107cCb",
      UniswapReceipeABI,
      signer
    );

    const tx = await uniswap_receipe.toPie(dynasetid,"10000000000000000000",{value :web3.utils.toWei("1"), gasPrice: web3.utils.toWei("1", "microether"),gasLimit: 210000 });

    console.log(`Transaction hash: ${tx.hash}`);

    const receipt = await tx.wait();
      
    console.log(`Transaction was mined in block ${receipt.blockNumber}`);
  
  };

  return (
    <>
      <CurrencyInputPanel
        balance={balance}
        currency={fromCurrency}
        onChange={changeprice}
        label="From"
      />

      {type && (
        <Typography>
          {amounteth} {fromCurrency} = {toCurrencyPrice} {token}
        </Typography>
      )}

      <img src={arrowDownIcon} className="my-3" />

      <Typography>1 {token} = 0.49 USD</Typography>

      <CurrencyInputPanel balance={toCurrencyPrice} currency={token} label="To" />

      <FeeBlock>
        <Typography size={14}>Fee:</Typography>
        <Typography size={14}>{fee.toFixed(2)} ETH</Typography>
      </FeeBlock>

      <GradientButton onClick={mintwithEth}>Mint {token}</GradientButton>
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
