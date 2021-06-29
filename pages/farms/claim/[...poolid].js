import React, { useEffect, useState } from "react";
// reactstrap components
import { Card, Container, Row, Col, Input, Modal, Button } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";

import Typography, { GradientTypography } from "../../../components/Typography";
// import { OutlinedButton } from "../components/Buttons";
// import styled from "styled-components";
// import { useRouter } from "next/router";
// import { useUser } from "components/UserContext";
// import web3 from "web3";
// import { ethers } from "ethers";
import classnames from "classnames";
// import AirdropABI from "../assets/constants/abi/AirdropABI.json";
import TokenFunctionPanel, { PanelTypes } from "../../../components/TokenFunctionPanelStake/index.js";
import { useRouter } from "next/router";
import { Currencies } from "../../../utils/currencies";
// const GradientRow = styled(Row)`
//   background: ${({ theme }) => theme.color.gradient2};
//   border-radius: 8px;
//   padding: 24px 28px;
// `;

// const DetailTitle = styled(Typography)`
//   color: ${({ theme }) => theme.color.grayLight};
//   font-size: 14px;
//   font-weight: 600;
//   margin-bottom: 10px;
// `;

// const StepTitle = styled(GradientTypography)`
//   font-size: 18px;
//   font-weight: 600;
//   margin-bottom: 15px;
// `;

// const StepDescription = styled(Typography)`
//   font-size: 14px;
//   padding-left: 6px;
// `;

// const SubCard = styled(Card)`
//   padding: 32px 24px;
//   margin-bottom: 0px;
//   height: 100%;
// `;

// const SubTitle = styled(Typography)`
//   font-size: 20px;
//   font-weight: 600;
// `;

// const AddressInput = styled(Input)`
//   max-width: 420px;
//   font-size: 18px;
// `;

// let minABI = [
//   // balanceOf
//   {
//     constant: true,
//     inputs: [{ name: "_owner", type: "address" }],
//     name: "balanceOf",
//     outputs: [{ name: "balance", type: "uint256" }],
//     type: "function",
//   },
//   // decimals
//   {
//     constant: true,
//     inputs: [],
//     name: "decimals",
//     outputs: [{ name: "", type: "uint8" }],
//     type: "function",
//   },
//   {
//     constant: false,
//     inputs: [
//       {
//         name: "_spender",
//         type: "address",
//       },
//       {
//         name: "_value",
//         type: "uint256",
//       },
//     ],
//     name: "approve",
//     outputs: [
//       {
//         name: "",
//         type: "bool",
//       },
//     ],
//     payable: false,
//     stateMutability: "nonpayable",
//     type: "function",
//   },
// ];

// const claimers = [{ wallet: "0xA5a9Ac3cF732DD93481E497cdBfD903aD7CdE543", reward: "1000" }];

// const getreward = async (account) => {
//   const rewardamount = claimers.find((claimer) => claimer.wallet === account);

//   console.log(rewardamount);

//   if (rewardamount) {
//     return rewardamount.reward;
//   } else {
//     return null;
//   }
// };

const DetailLabel = ({ name, value, isDetail = true, icon }) => (
  <div
    className={classnames(
      {
        "justify-content-center": !isDetail,
      },
      "d-flex"
    )}
  >
    <Typography color="gray" size={isDetail ? 14 : 18} weight={400} className="mr-2 flex-shrink-0">
      {name}:
    </Typography>
    {icon}
    <GradientTypography size={isDetail ? 14 : 18} weight={400} className="text-break text-align-left">
      {value}
    </GradientTypography>
  </div>
);

function StakeClaim() {

  // const { library, account } = useUser();
  const router = useRouter();
 const { poolid } = router.query;
 let token;
 let address; 
 let currencyid;
 console.log(poolid[0]);

 if(poolid[0].toString() === "0"){
   console.log("test");
   token = "SDAO LP";
   address = "0x4c78b6566864ae6304c2c2a4c43b74dafaac167e";
   currencyid = Currencies.SDAO_LP.id;

 }else if(poolid[0].toString() === "1"){
      token = "AGIX LP";
      address = "0x5318855ad173220e446002c01d5ee5f940502e70";
      currencyid = Currencies.AGIX_LP.id; 
      console.log("test 1");
 }
  // const [eligible, seteligible] = useState(false);
  // const [defaultModal, setDefaultModal] = useState(false);
  // const [isError, setIsError] = useState(false);
  // const [alreadyClaimedOpen, setAlreadyClaimedOpen] = useState(false);
  // const [airdropSuccessOpen, setAirdropSucessOpen] = useState(false);
  // const [agibalance, setagibalance] = useState(0);
  // const [sdaoreward, setreward] = useState(0);

  useEffect(() => {
    // const fetchData = async () => {
    //   const signer = await library.getSigner(account);

    //   const agitoken = new ethers.Contract("0xdce099640a3343497e0dd0fc9b99d1b9dda2d758", minABI, signer);

    //   const bal = await agitoken.balanceOf(account);

    //   console.log(web3.utils.fromWei(bal.toString()));

    //   setagibalance(web3.utils.fromWei(bal.toString()));
    //   const reward = await getreward(account);

    //   if (bal > 0) {
    //     setreward(reward);
    //     seteligible(true);
    //   } else {
    //     seteligible(false);
    //   }
    // };

    // fetchData();
  });

  // const claimTokens = async () => {
  //   const signer = await library.getSigner(account);

  //   const Dynaset = new ethers.Contract("0x63558477E7E2C9DF4267988BB7D6a38f18b5053E", AirdropABI, signer);

  //   try {
  //     const tx = await Dynaset.claimdrop({
  //       gasLimit: 210000,
  //       gasPrice: web3.utils.toWei("120", "gwei"),
  //     });

  //     console.log(`Transaction hash: ${tx.hash}`);

  //     const receipt = await tx.wait();

  //     console.log(`Transaction was mined in block ${receipt.blockNumber}`);

  //     setAirdropSucessOpen(true);
  //   } catch (error) {
  //     console.log(error);
  //     setIsError(true);
  //   }
  // };

  // const calculaterewardTokens = async () => {
  //   const signer = await library.getSigner(account);

  //   const agitoken = new ethers.Contract("0xdce099640a3343497e0dd0fc9b99d1b9dda2d758", minABI, signer);

  //   const bal = await agitoken.balanceOf(account);
  //   console.log(web3.utils.fromWei(bal.toString()));

  //   setagibalance(web3.utils.fromWei(bal.toString()));
  //   const reward = await getreward(account);

  //   setreward(reward);

  //   seteligible(true);
  // };

  return (
    <Container className="my-4">
      <TokenFunctionPanel panelType="CLAIM" id={poolid[0].toString()} token={token} address={address} currencyid={currencyid}/>
    </Container>
  );
}

StakeClaim.layout = Admin;

export default StakeClaim;
