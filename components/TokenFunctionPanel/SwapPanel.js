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
import DynasetABI from '../../assets/constants/abi/Dynaset.json';

const FeeBlock = styled(Row)`
  border-top: ${({ theme }) => `1px solid ${theme.color.grayLight}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.color.grayLight}`};
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
  padding: 8px 0;
`;

const SwapPanel = ({ type,token,dynasetid }) => {
  const [fromCurrency, setFromCurrency] = useState("BAT");
  const [toCurrency, setToCurrency] = useState("DAI");
  const [balance, setBalance] = useState(0);
  const [amounteth,setamountEth] = useState(0);
  const [totoken, setTotoken] = useState("0xad6d458402f60fd3bd25163575031acdce07538d");
  const [toCurrencyPrice, setToCurrencyPrice] = useState(0);
  const [fromtoken, setFromtoken] = useState("0x443fd8d5766169416ae42b8e050fe9422f628419");
  const [fromCurrencyPrice, setFromCurrencyPrice] = useState(0);

  const [fee, setFee] = useState(0);
  const [amount,setAmount] = useState();
  const {library, account} = useUser();


  const changeprice  = async (e) => {

        const signer = await library.getSigner(account);

        const Dynaset = new ethers.Contract(
          dynasetid ,
          DynasetABI.abi,
          signer
        );

       const spotprice = await Dynaset.getSpotPrice(fromtoken,totoken);
       
       const price = web3.utils.toWei(e) * web3.utils.fromWei(spotprice.toString(), "ether" );

       console.log(price);
      // console.log(parseInt(price)) // 201.306

       setFromCurrencyPrice(web3.utils.toWei(e));
       setToCurrencyPrice(price);

      // console.log(route.midPrice.invert().toSignificant(6)) // 0.00496756
  }

  const swap = async () => {

    const signer = await library.getSigner(account);

    const Dynaset = new ethers.Contract(
      dynasetid ,
      DynasetABI.abi,
      signer
    );
 
    const tx = await Dynaset.swapExactAmountIn(
      totoken,
      toCurrencyPrice.toString(),
      fromtoken,
      fromCurrencyPrice.toString(),
      web3.utils.toWei("1000"),
      {gasLimit: 210000, gasPrice: web3.utils.toWei("120", "gwei")});

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
          {fromCurrencyPrice} {fromCurrency} = {toCurrencyPrice} {token}
        </Typography>
      )}

      <img src={arrowDownIcon} className="my-3" />

      <Typography>1 {token} = 0.49 USD</Typography>

      <CurrencyInputPanel  balance={toCurrencyPrice} currency={toCurrency} label="To" />

      <FeeBlock> 
        <Typography size={14}>Fee:</Typography>
        <Typography size={14}>{fee.toFixed(2)} ETH</Typography>
      </FeeBlock>

      <GradientButton onClick={swap}>Swap</GradientButton>
    </>
  );
};

SwapPanel.propTypes = {
  type: PropTypes.bool,
};

SwapPanel.defaultProps = {
  // If true, it means that it is the buy panel. If false, it is the swap panel.
  type: true,
};

export default SwapPanel;
