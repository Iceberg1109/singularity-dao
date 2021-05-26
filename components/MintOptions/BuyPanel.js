import { useState,useEffect } from "react";
import styled from "styled-components";
import { Row, ListGroupItem,Progress,Col,  Container } from "reactstrap";
import CurrencyInputPanel from "../../components/CurrencyInputPanel";
import arrowDownIcon from "../../assets/img/icons/arrow-down.png";
import Typography from "../Typography";
import { GradientButton,PrimaryButton } from "../Buttons";
import PropTypes from "prop-types";
import {useUser} from '../../components/UserContext';
import web3 from 'web3';
import { ChainId, Token, WETH,Trade,TokenAmount, TradeType, Fetcher, Route,Percent } from '@uniswap/sdk'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { Doughnut } from "react-chartjs-2";

import {ethers} from 'ethers';
import ForgeABI from '../../assets/constants/abi/Forge.json';

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
  const [forgebalance, setForgeBalance] = useState(0);
  const [cap,setcap]= useState(0);
  const [amounteth,setamountEth] = useState(0);
  const [usereth,setusereth] = useState(0);
  const [userdynaset,setuserdynaset] = useState(0);
  const [percentage,setpercentage] = useState(0);
  const [total,settotal] = useState(0);

  const {library, account} = useUser();

  const chartExample5 = {
    data: {
      labels: [],
      datasets: [
        {
          data: [
            percentage.toString(),
            total.toString(),
          ],
          backgroundColor: [
            "#3689FF",
             "#DCDFF3",
          ],
          label: "Dataset 1",
        },
      ],
    },
    options: {
      responsive: true,
      animation: {
        animateScale: true,
        animateRotate: true,
      },
    },
  };


    useEffect(() => {

  const fetchData = async () => {
   
    const signer = await library.getSigner(account);

    const forge = new ethers.Contract(
      "0xDCC2efA941dA67aE6061498E0F7b50904488f24B",
      ForgeABI,
      signer
    );

    const getcap = await forge.getCap();

    const forgebalance = await forge.getForgeBalance();

    const userbalance = await forge.getUserEthBalance(account);

    const usertokenbalance = await forge.getUserTokensBalance(account);

    setForgeBalance(web3.utils.fromWei(forgebalance.toString()));
    setcap(web3.utils.fromWei(getcap.toString()));

    let percent = (web3.utils.fromWei(forgebalance.toString())/web3.utils.fromWei(getcap.toString()))*100;

    setpercentage(percent)

     console.log("userbalance");
    console.log(userbalance.toString());
     console.log("usertokenbalance");
    console.log(usertokenbalance.toString());


    setusereth(parseFloat(web3.utils.fromWei(userbalance.toString())).toFixed(4));
    setuserdynaset(parseFloat(web3.utils.fromWei(usertokenbalance.toString())).toFixed(4));

    };

    fetchData();

  }, );


  const fetchDataAfterTx = async () => {
   
    const signer = await library.getSigner(account);

    const forge = new ethers.Contract(
      "0xDCC2efA941dA67aE6061498E0F7b50904488f24B",
      ForgeABI,
      signer
    );

    const getcap = await forge.getCap();

    const forgebalance = await forge.getForgeBalance();

    const userbalance = await forge.getUserEthBalance(account);

    const usertokenbalance = await forge.getUserTokensBalance(account);

    setForgeBalance(web3.utils.fromWei(forgebalance.toString()));
    setcap(web3.utils.fromWei(getcap.toString()));

    let percent = (web3.utils.fromWei(forgebalance.toString())/web3.utils.fromWei(getcap.toString()))*100;

    let total = percent/100;

    setpercentage(percent)

    settotal(percent)

     console.log("userbalance");
    console.log(userbalance.toString());
     console.log("usertokenbalance");
    console.log(usertokenbalance.toString());


    setusereth(parseFloat(web3.utils.fromWei(userbalance.toString())).toFixed(4));
    setuserdynaset(parseFloat(web3.utils.fromWei(usertokenbalance.toString())).toFixed(4));

    };




  const changeprice  = async (e) => {

      setamountEth(e)
  
  }

  const buy = async () => {

    const signer = await library.getSigner(account);

    const forge = new ethers.Contract(
      "0xDCC2efA941dA67aE6061498E0F7b50904488f24B",
      ForgeABI,
      signer
    );

  //  const DAI = new Token(ChainId.ROPSTEN, dynasetid, 18);

  

    const tx = await uniswap.swapExactETHForTokens(
        web3.utils.toWei(toCurrencyPrice.toString(),"gwei"),
        [route.path[0].address,route.path[1].address],
        account,
        deadline,
        {value :web3.utils.toWei(amounteth.toString(), "ether"), gasPrice: web3.utils.toWei("60", "gwei")}
      );

    console.log(`Transaction hash: ${tx.hash}`);

    const receipt = await tx.wait();

    fetchDataAfterTx();
      
    console.log(`Transaction was mined in block ${receipt.blockNumber}`);
  
  };

    const deposit = async () => {

    const signer = await library.getSigner(account);

    const forge = new ethers.Contract(
      "0xDCC2efA941dA67aE6061498E0F7b50904488f24B",
      ForgeABI,
      signer
    );

    const tx = await forge.deposit(
        {value :web3.utils.toWei(amounteth.toString(), "ether"), gasPrice: web3.utils.toWei("60", "gwei")}
      );

    console.log(`Transaction hash: ${tx.hash}`);

    const receipt = await tx.wait();

     fetchDataAfterTx();
      
    console.log(`Transaction was mined in block ${receipt.blockNumber}`);
  
  };

      const withdraw = async () => {

    const signer = await library.getSigner(account);

    const forge = new ethers.Contract(
      "0xDCC2efA941dA67aE6061498E0F7b50904488f24B",
      ForgeABI,
      signer
    );

    const tx = await forge.withdrawOutput(account);

    console.log(`Transaction hash: ${tx.hash}`);

    const receipt = await tx.wait();
    
     fetchDataAfterTx();
    console.log(`Transaction was mined in block ${receipt.blockNumber}`);
  
  };

    const withdraweth = async () => {

    const signer = await library.getSigner(account);

    const forge = new ethers.Contract(
      "0xDCC2efA941dA67aE6061498E0F7b50904488f24B",
      ForgeABI,
      signer
    );

    const userbalance = await forge.getUserEthBalance(account);

    const tx = await forge.withdrawETH(userbalance,account);

    console.log(`Transaction hash: ${tx.hash}`);

    const receipt = await tx.wait();

     fetchDataAfterTx();
      
    console.log(`Transaction was mined in block ${receipt.blockNumber}`);
  
  };

  return (
    <>
       <ListGroupItem  style={{marginTop:'20px'}}>
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Y2ciUSipk4CK10FaWorqWfnCY0xQCFIGzA&usqp=CAU"
                          />
                        </a>
                      </Col>
                      <div className="col">
                        <h5>DynaForge {percentage}% filled</h5>
                        <Progress
                          color="success"
                          className="progress-xs mb-0"
                          max="100"
                          value={percentage}
                        />
                      </div>
                    </Row>
                  </ListGroupItem>

             <Row className="justify-content-center" style={{width:"100%"}}>
 
      <CurrencyInputPanel
        balance={amounteth}
        currency={fromCurrency}
        onChange={changeprice}
        label="From"
      />
      
         </Row>
       <br/>
         <br/>
          <Row className="justify-content-center" style={{width:"100%"}}>
          <Col className="col-auto">
      <GradientButton onClick={deposit}>Deposit Eth</GradientButton>
      </Col>
          </Row>
           <Row className="justify-content-center" style={{width:"100%"}}>
           <Typography style={{marginTop:'30px'}}>Currently in the forge : </Typography>
         </Row>
         <Row style={{ width:"100%",marginTop:'20px'}}>
         <Col className="col-auto">
         <Typography>Balance : {usereth} </Typography>
          <span style={{width:'30px'}}/>
    
      </Col>
        <Col className="col-auto">
          <PrimaryButton onClick={withdraweth}>Withdraw eth</PrimaryButton>
               </Col>
                      </Row>


         <Row style={{ width:"100%",marginTop:'20px'}}>
         <Col className="col-auto">
         <Typography>Balance : {userdynaset} </Typography>
         <span style={{width:'30px'}}/>
     
                     </Col>
                     <Col className="col-auto">
                        <PrimaryButton onClick={withdraw}>Withdraw {token}</PrimaryButton>
                       </Col>
                      </Row>
   
      
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
