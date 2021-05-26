import React, { useState, useEffect } from "react";
// reactstrap components
import { Card, Container, Row, Col, Input, Modal, Button } from "reactstrap";
import { useRouter } from "next/router";
// layout for this page
import Admin from "layouts/Admin.js";

import Typography, { GradientTypography } from "../../components/Typography";
import styled from "styled-components";
import { OutlinedButton } from "../../components/Buttons";
import classnames from "classnames";
import {useUser} from '../../components/UserContext';
import web3 from 'web3';

import { ChainId, Token, WETH,Trade,TokenAmount, TradeType, Fetcher, Route,Percent } from '@uniswap/sdk'

import {ethers} from 'ethers';
import AirdropABI from '../../assets/constants/abi/AirdropABI.json';

const SubTitle = styled(Typography)`
  font-size: 20px;
  font-weight: 600;
`;

const GradientRow = styled(Row)`
  background: ${({ theme }) => theme.color.gradient2};
  border-radius: 8px;
  padding: 24px 28px;
`;

const DetailTitle = styled(Typography)`
  color: ${({ theme }) => theme.color.grayLight};
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const StepTitle = styled(GradientTypography)`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const StepDescription = styled(Typography)`
  font-size: 14px;
  padding-left: 6px;
`;

const SubCard = styled(Card)`
  padding: 32px 24px;
  margin-bottom: 0px;
  height: 100%;
`;

const AddressInput = styled(Input)`
  max-width: 420px;
  font-size: 18px;
`;

let minABI = [
  // balanceOf
  {
    "constant":true,
    "inputs":[{"name":"_owner","type":"address"}],
    "name":"balanceOf",
    "outputs":[{"name":"balance","type":"uint256"}],
    "type":"function"
  },
  // decimals
  {
    "constant":true,
    "inputs":[],
    "name":"decimals",
    "outputs":[{"name":"","type":"uint8"}],
    "type":"function"
  }, 
  {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
];

const claimers = [{"wallet":"0xA5a9Ac3cF732DD93481E497cdBfD903aD7CdE543","reward":"1000"}];


function AirdropStep1() {

  const [defaultModal, setDefaultModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [alreadyClaimedOpen, setAlreadyClaimedOpen] = useState(false);
  const [airdropSuccessOpen, setAirdropSucessOpen] = useState(false);
  const [agibalance,setagibalance] = useState(0);
  const [sdaoreward,setreward] = useState(0);
  const [eligible,seteligible] = useState(false);
  const router = useRouter();
  const {library, account} = useUser();


    const getreward = async (account) => {

    const rewardamount = claimers.find(claimer => claimer.wallet === account);
    
    console.log(rewardamount);

      if(rewardamount){

         return rewardamount.reward
      
      } else {

        return null;
      }
   
    }

   const calculaterewardTokens = async () => {

        const signer = await library.getSigner(account);
    
        const agitoken = new ethers.Contract(
          "0xdce099640a3343497e0dd0fc9b99d1b9dda2d758",
          minABI,
          signer
        );

        const bal = await agitoken.balanceOf(account);

        console.log(web3.utils.fromWei(bal.toString()));

        setagibalance(web3.utils.fromWei(bal.toString()));
        const reward = await getreward(account);

        setreward(reward);

        seteligible(true);
   }

  const claimTokens = async () => {

    const signer = await library.getSigner(account);

    const Dynaset = new ethers.Contract(
      "0x63558477E7E2C9DF4267988BB7D6a38f18b5053E",
      AirdropABI,
      signer
    );

    try {

    const tx = await Dynaset.claimdrop({gasLimit: 210000, gasPrice: web3.utils.toWei("120", "gwei")});

    console.log(`Transaction hash: ${tx.hash}`);

    const receipt = await tx.wait();
      
    console.log(`Transaction was mined in block ${receipt.blockNumber}`);
  
    setAirdropSucessOpen(true);

    } catch (error){

      console.log(error);
      setIsError(true);

    }

  }



  const DetailLabel = ({ name, value, isDetail = true, icon }) => (
    <div
      className={classnames(
        {
          "justify-content-center": !isDetail,
        },
        "d-flex"
      )}
    >
      <Typography
        color="gray"
        size={isDetail ? 14 : 18}
        weight={400}
        className="mr-2 flex-shrink-0"
      >
        {name}:
      </Typography>
      {icon}
      <GradientTypography
        size={isDetail ? 14 : 18}
        weight={400}
        className="text-break text-align-left"
      >
        {value}
      </GradientTypography>
    </div>
  );

  return (
    <Container className="my-4">
      <GradientRow className="justify-content-between m-0">
        <div>
          <div className="text-align-center d-inline-block">
            <DetailTitle>Amount</DetailTitle>
            <Typography size={16} color="white" weight={600}>
              100,000 Dynasets
            </Typography>
          </div>
        </div>
        <div>
          <div className="text-align-center d-inline-block">
            <DetailTitle>Registration period</DetailTitle>
            <Typography size={16} color="white" weight={600}>
              Start: April 6, 8:00.00 UTC
            </Typography>
            <Typography size={16} color="white" weight={600}>
              End: April 12, 7:59.00 UTC
            </Typography>
          </div>
        </div>
        <div>
          <div className="text-align-center d-inline-block">
            <DetailTitle>Airdrop date</DetailTitle>
            <Typography size={16} color="white" weight={600}>
              April 12, 8:00 UTC
            </Typography>
          </div>
        </div>
      </GradientRow>

      <Row className="mt-4">
        <Col lg={5}>
          <SubCard>
            <SubTitle>Details</SubTitle>
            <div className="mt-4">
              <DetailLabel
                name="Smartcontract"
                value="0x9C0407b3A80bD3720a6ad9..."
              />
              <DetailLabel name="Token symbol" value="50" />
              <DetailLabel name="Total supply" value="100,000 Dynasets" />
              <DetailLabel name="Release status" value="Released" />
            </div>
            <div className="mt-3">
              <DetailLabel name="Additional info" value="Info" />
              <DetailLabel name="Additional info" value="Info" />
              <DetailLabel name="Additional info" value="Info" />
            </div>
          </SubCard>
        </Col>
        <Col lg={7}>
          <SubCard>
            <SubTitle>Whitelisting</SubTitle>
            <div className="d-flex flex-direction-lg-column align-items-center mt-4">
              <AddressInput
                placeholder="Insert your valid ERC20 address"
                type="text"
                value={account}
              />
              <div className="my-3">
                <DetailLabel
                  name="AGI tokens"
                  value={agibalance}
                  isDetail={false}
                />
                <DetailLabel
                  name="SDAO reward"
                  value={sdaoreward}
                  isDetail={false}
                />
                <DetailLabel
                  name="Status"
                  value=""
                  size={18}
                  icon={eligible ? ("Eligible ✅"):("Not Eligible ❌")}
                  isDetail={false}
                />
              </div>
            <OutlinedButton
                className="mt-3"
                onClick={calculaterewardTokens}
              >
                Calculate reward
              </OutlinedButton>
              <OutlinedButton
                className="mt-3"
                onClick={claimTokens}
              >
                Claim Tokens
              </OutlinedButton>

              <Modal
                className="modal-dialog-centered"
                isOpen={defaultModal}
                toggle={() => setDefaultModal(false)}
              >
                <div className="modal-body text-align-center p-5">
                  <Typography size={20} weight={600}>
                    {isError
                      ? "Ops...something went wrong"
                      : "Registered successfully"}
                  </Typography>
                  <Typography size={14} className="mt-4">
                    {isError
                      ? "Unfortunately, something wrong happened.\nPlease try later. <Error message>"
                      : "Your address has been added to the whitelist. Come back to claim Dynasets tokens once the Airdrop starts!"}
                  </Typography>
                  <OutlinedButton
                    className="mt-4 "
                    onClick={() => setDefaultModal(false)}
                  >
                    Ok
                  </OutlinedButton>
                </div>
              </Modal>

              <Modal
                className="modal-dialog-centered"
                isOpen={airdropSuccessOpen}
                toggle={() => setAirdropSucessOpen(false)}
              >
                <div className="modal-body text-align-center p-5">
                  <Typography size={20} weight={600} className="mb-4">
                    Airdrop Successful!
                  </Typography>
                  <DetailLabel
                    name="Address"
                    value="0x9C0407b3A80bD3720c22E23554814b1c186a6ad9"
                  />
                  <DetailLabel name="Amount sent" value="2692 Dynasets" />
                  <DetailLabel
                    name="Date"
                    value="April 09, 2021 - 21:33:00 UTC"
                  />
                  <DetailLabel
                    name="Tx ID"
                    value="0x7a4650e45891921a619fc35fe8746753394e8e770df99696f5b12e008ce6a29f"
                  />
                  <OutlinedButton
                    className="mt-4 "
                    onClick={() => setAirdropSucessOpen(false)}
                  >
                    Ok
                  </OutlinedButton>
                </div>
              </Modal>

              <Modal
                className="modal-dialog-centered"
                isOpen={alreadyClaimedOpen}
                toggle={() => setAlreadyClaimedOpen(false)}
              >
                <div className="modal-body text-align-center p-5">
                  <Typography size={20} weight={600} className="mb-4">
                    Tokens already claimed!
                  </Typography>
                  <DetailLabel
                    name="Date"
                    value="April 09, 2021 - 21:33:00 UTC"
                  />
                  <DetailLabel
                    name="Tx ID"
                    value="0x7a4650e45891921a619fc35fe8746753394e8e770df99696f5b12e008ce6a29f"
                  />
                  <OutlinedButton
                    className="mt-4 "
                    onClick={() => setAlreadyClaimedOpen(false)}
                  >
                    Ok
                  </OutlinedButton>
                </div>
              </Modal>
            </div>
          </SubCard>
        </Col>
      </Row>

      <Card className="p-4 mt-4">
        <SubTitle>Airdrop rules</SubTitle>
        <div className="mt-4">
          <StepTitle>Step 1</StepTitle>
          <StepDescription>
            Register your address clicking on the button “register your address”
            and check if you are eligible, hence you have required AGI amount.
          </StepDescription>
        </div>
        <div className="mt-4">
          <StepTitle>Step 2</StepTitle>
          <StepDescription>
            Stay tuned for news about the Airdrop following the telegram channel
            and subscribing to the mailing list. Be sure you keep the required
            amount of tokens on the same address you registered until the
            Airdrop date arrives.
            <br />
            <br /> Only addresses who have been registered on the platform, and
            match the required amount of AGI at the time of the snapshot will be
            granted for claim the Airdrop.
          </StepDescription>
        </div>
        <div className="mt-4">
          <StepTitle>Step 3</StepTitle>
          <StepDescription>
            After the date has came, you can claim your free tokens.
            <br /> <br /> Well done!
          </StepDescription>
        </div>
      </Card>
    </Container>
  );
}

AirdropStep1.layout = Admin;

export default AirdropStep1;
