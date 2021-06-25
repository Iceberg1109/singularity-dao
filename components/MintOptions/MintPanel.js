import { useState ,useEffect } from "react";
import styled from "styled-components";
import { Row, ListGroupItem,Progress,Col,  Container } from "reactstrap";
import CurrencyInputPanel from "../CurrencyInputPanel";
import Typography from "../Typography";
import { GradientButton } from "../Buttons";
import PropTypes from "prop-types";
import TokenInputPanel from "../TokenInputPanel";
import {useUser} from '../../components/UserContext';
import web3 from 'web3';
import { ChainId, Token, WETH,Trade,TokenAmount, TradeType, Fetcher, Route,Percent } from '@uniswap/sdk'
import {ethers} from 'ethers';
import DynasetABI from '../../assets/constants/abi/Dynaset.json';
import ForgeABI from '../../assets/constants/abi/Forge.json';
import { getGasPrice } from "../../utils/ethereum";


const TokensBlock = styled(Row)`
  border-top: ${({ theme }) => `1px solid ${theme.color.grayLight}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.color.grayLight}`};
  justify-content: space-between;
  width: 100%;
  padding: 0px 0;
  margin-bottom: 20px;
`;

const MintPanel = ({ token,ptokens, type,dynasetid }) => {
  const [receiveCurrency, setReceiveCurrency] = useState("ETH");
  const [balance, setBalance] = useState(0);
  const [tokens,setTokens] = useState([]);
  const [amounteth,setamountEth] = useState(0);
  const [toCurrencies, setToCurrencies] = useState([]);
  const [ratios, setRatios] = useState(["1000000000000000000000000","1000000000000000000000000","1000000000000000000000000"]);

  const {library, account} = useUser();

  console.log(ptokens);




  const changeprice  = async (e) => {

    const signer = await library.getSigner(account);

    const Dynaset = new ethers.Contract(
      dynasetid,
      DynasetABI.abi,
      signer
    );

  //  const DAI = new Token(ChainId.ROPSTEN, dynasetid, 18);

    const totalsupply = await Dynaset.totalSupply();
    console.log(" dynaset totalsupply:"+ totalsupply);

    const ratio = ethers.BigNumber.from(e)/totalsupply;

    console.log("ratio");

    console.log(ratio);

    // var results: number[] = await Promise.map(tokens, async (item): Promise<number> => {
    //   await Dynaset._getInputToken(item);
    //   return item + 1;
    // });

     setToCurrencies([]);

    const results = await Promise.all(ptokens.map(async (i) => {
      let coin = i.token;
      let token = ratio * i.balance;
      // console.log(web3.utils.toWei(token.toString()));
      return {symbol:coin.symbol, ratio:ethers.BigNumber.from(token.toFixed(0)).toString(),address:coin.id};
    }));

    const resultsbuy = await Promise.all(ptokens.map(async (i) => {
      let coin = i.token;
      let token = ratio * i.balance;

      return web3.utils.toWei(ethers.BigNumber.from(token.toFixed(0)).toString()).toString();
    }));

    // console.log(resultsbuy);

    // console.log(results);
     setamountEth(e);

     setToCurrencies(results);
    //setRatios(resultsbuy);
  
  }

    const mintWithForge = async () => {

    const signer = await library.getSigner(account);

    const Forge = new ethers.Contract(
      dynasetid,
      ForgeABI,
      signer
    );

  //  const DAI = new Token(ChainId.ROPSTEN, dynasetid, 18);

  //   const totalsupply = await Dynaset.totalSupply();

  //   console.log(" dynaset totalsupply:");

  // //  var total = ethers.BigNumber.from();

  //   console.log(totalsupply.toString());

  //   const tx = await Dynaset.joinPool(web3.utils.toWei(amounteth),
  //     ratios,
  //     {gasLimit: 210000, gasPrice: web3.utils.toWei("120", "gwei")});

  //   console.log(`Transaction hash: ${tx.hash}`);

  //   const receipt = await tx.wait();
      
  //   console.log(`Transaction was mined in block ${receipt.blockNumber}`);
  
  };

  const mint = async () => {

    const signer = await library.getSigner(account);

    const Dynaset = new ethers.Contract(
      dynasetid,
      DynasetABI.abi,
      signer
    );

  //  const DAI = new Token(ChainId.ROPSTEN, dynasetid, 18);

    const totalsupply = await Dynaset.totalSupply();

    console.log(" dynaset totalsupply:");

  //  var total = ethers.BigNumber.from();

    console.log(totalsupply.toString());
    const gasPrice = await getGasPrice()
    const tx = await Dynaset.joinPool(web3.utils.toWei(amounteth),
      ratios,
      {gasLimit: 210000, gasPrice});

    console.log(`Transaction hash: ${tx.hash}`);

    const receipt = await tx.wait();
      
    console.log(`Transaction was mined in block ${receipt.blockNumber}`);
  
  };

  return (
    <>
 
      <CurrencyInputPanel
        balance={balance}
        onChange={changeprice}
        currency={token}
        label={"Create"}
      />

      <TokensBlock>
        {toCurrencies && toCurrencies.map((token) => {

           let coin = token;

          return <TokenInputPanel currency={coin.symbol} ratio={coin.ratio} address={coin.address} dynasetId={dynasetid} />;
        }
        )}
      </TokensBlock>

      <GradientButton onClick={mint}>Mint</GradientButton>

    </>
  );
};

MintPanel.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.object),
  type: PropTypes.bool,
};

MintPanel.defaultProps = {
  // If true, it means that it is the mint panel. If false, it is the burn panel.
  type: true,
};

export default MintPanel;
