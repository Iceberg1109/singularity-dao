import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Card,
  Container,
  Row,
  Col,
  Input,
  Modal,
  Button,
  Spinner,
} from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";

import Typography, { GradientTypography } from "../components/Typography";
import { OutlinedButton, DefaultButton } from "../components/Buttons";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useUser } from "components/UserContext";
import web3 from "web3";
import { ethers } from "ethers";
import classnames from "classnames";
import AirdropABI from "../assets/constants/abi/AirdropABI.json";
import * as EmailValidator from "email-validator";
import NotificationAlert from "react-notification-alert";
import WalletModal from "../components/WalletModal";
import { injected, walletconnect } from "../components/UserContext";

const GradientRow = styled(Row)`
  background: ${({ theme }) => theme.color.gradient1};
  border-radius: 8px;
  padding: 24px 28px;
`;

const DetailTitle = styled(Typography)`
  color: ${({ theme }) => theme.color.grayLight};
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const StepTitle = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const StepDescription = styled(Typography)`
  font-size: 14px;
  color: ${({ theme }) => theme.color.text2};
`;

const SubCard = styled(Card)`
  padding: 32px 24px;
  margin-bottom: 0px;
  height: 100%;
`;

const SubTitle = styled(Typography)`
  font-size: 20px;
  font-weight: 600;
`;

const AddressInput = styled(Input)`
  font-size: 18px;
`;

const CustomColumn = styled(Col)`
  text-align: center;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GradientBackground = styled.div`
  background: linear-gradient(90deg, #4100ca 0%, #224bdb 100%);
  opacity: 0.45;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 1375px;
  z-index: -1;
`;

const BackgroundContainer = styled.div`
  background: url(${require("assets/img/fakurian-arts.jpg")});
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 1375px;
  z-index: -2;
`;

const CustomSpinner = styled(Spinner)`
  width: 4rem;
  height: 4rem;
  position: fixed;
  left: 50vw;
  top: 50vh;
  color: ${({ theme }) => theme.color.interactive2};
  border-width: 0.4rem;
`;

const Section = styled.div`
  opacity: ${({ isLoading }) => (isLoading ? 0.5 : 1)};
`;

let minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  // decimals
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const claimers = [
  {
    wallet: "0xA5a9Ac3cF732DD93481E497cdBfD903aD7CdE543",
    reward: "1000",
    claim: false,
  },
];

const getreward = async (account) => {
  const rewardamount = claimers.find((claimer) => claimer.wallet === account);

  console.log(rewardamount);

  if (rewardamount) {
    return rewardamount.reward;
  } else {
    return null;
  }
};

const DetailLabel = ({ name, value, isDetail = true, icon }) => (
  <div>
    <Typography
      color="purple"
      size={isDetail ? 16 : 18}
      weight={600}
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

const DetailLabel2 = ({ name, value, isDetail = true, icon }) => (
  <div
    className={classnames(
      {
        "justify-content-center": !isDetail,
      },
      "d-flex"
    )}
  >
    <Typography
      color="grey"
      size={isDetail ? 16 : 18}
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

function AirdropPage() {
  const { connector, library, account, connect, waccount, weligible } =
    useUser();
  const router = useRouter();

  const [eligible, seteligible] = useState(false);
  const [defaultModal, setDefaultModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [alreadyClaimedOpen, setAlreadyClaimedOpen] = useState(false);
  const [airdropSuccessOpen, setAirdropSucessOpen] = useState(false);
  const [agibalance, setagibalance] = useState("0");
  const [staker, setstaker] = useState(false);
  const [holder, setholder] = useState(false);
  const [sdaoreward, setreward] = useState(0);
  const [email, setEmail] = useState("");
  const [hasclaimed, setasclaimed] = useState(false);
  const notificationAlertRef = React.useRef(null);
  const [checkingEligibility, setCheckingEligibility] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [walletModal, setWalletModal] = useState(false);
  const [txid, settxid] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!library || !account) return;
      const signer = await library.getSigner(account);

      const agitoken = new ethers.Contract(
        "0xdce099640a3343497e0dd0fc9b99d1b9dda2d758",
        minABI,
        signer
      );

      const bal = await agitoken.balanceOf(account);

      console.log(web3.utils.fromWei(bal.toString()));

      setagibalance(web3.utils.fromWei(bal.toString()));
    };

    checkifeligible();
    fetchData();
  }, [library, account]);

  useEffect(() => {
    connect("injected");
  }, []);

  const claimTokens = async () => {
    const signer = await library.getSigner(account);

    const Dynaset = new ethers.Contract(
      "0xe04b0988eB12A344A23403a178279c0EF1012d09",
      AirdropABI,
      signer
    );

    try {
      const tx = await Dynaset.claimdrop(
        web3.utils.toWei(sdaoreward.toString()),
        {
          gasLimit: 210000,
          gasPrice: web3.utils.toWei("120", "gwei"),
        }
      );

      setIsLoading(true);

      console.log("testin tx with wallet connect ", connector);

      if (connector == injected) {
        console.log(`Transaction hash: ${tx.hash}`);

        const receipt = await tx.wait();

        console.log(receipt);

        console.log(`Transaction was mined in block ${receipt.blockNumber}`);

        settxid(receipt.transactionHash);

        successClaimTokens();
        // set user has claimed
      } else if (connector == walletconnect) {
        connector
          .signTransaction(tx)
          .then((result) => {
            // Returns signed transaction
            console.log(result);

            successClaimTokens();
          })
          .catch((error) => {
            // Error returned when rejected
            console.error(error);
          });
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  const successClaimTokens = () => {
    setIsLoading(false);
    setAirdropSucessOpen(true);
    setasclaimed(true);
    connectOrRegister();
  };

  const calculaterewardTokens = async () => {
    const signer = await library.getSigner(account);

    const agitoken = new ethers.Contract(
      "0xdce099640a3343497e0dd0fc9b99d1b9dda2d758",
      minABI,
      signer
    );

    const bal = await agitoken.balanceOf(account);

    console.log(web3.utils.fromWei(bal.toString()));

    setagibalance("1000000");
    const reward = await getreward(account);

    setreward(reward);

    seteligible(true);
  };

  const checkifeligible = async () => {
    console.log(waccount);
    console.log(weligible);

    if (!account) {
      // notify("warning", "not connected");
      return seteligible(false);
    }
    setCheckingEligibility(true);
    const data = { wallet: account.toLowerCase() };
    try {
      const res = await fetch("api/airdrop/claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      console.log(response);

      if (response.error) {
        setCheckingEligibility(false);
        seteligible(false);
        return notify("warning", response.error);
      }

      if (response.is_eligible) {
        setCheckingEligibility(false);
        seteligible(true);
        setreward(parseFloat(response.reward));
        setagibalance(response.balance);
        setstaker(response.staker);
        setasclaimed(response.claimed);

        notify("success", "You are eligible");
      } else {
        setCheckingEligibility(true);
        notify("warning", "You are not eligible");
        seteligible(false);
      }
    } catch (error) {
      console.log("erroring check if eligible", error);
      setCheckingEligibility(false);
      notify("warning", "You are not eligible");
      seteligible(false);
    }
  };

  const connectOrRegister = async () => {
    console.log("updating claimed user");

    if (!account) {
      return setWalletModal(true);
    }

    setRegistering(true);
    const data = { wallet: account.toLowerCase() };
    try {
      const res = await fetch("/api/airdrop/hasclaimed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      if (response.error) {
        setRegistering(false);
        return notify("warning", response.error);
      }
      setRegistering(false);
      notify("success", "Successfully claimed!");
    } catch (error) {
      setRegistering(false);
      notify("warning", error.message);
    }
  };

  const notify = (type, text) => {
    let options = {
      place: "tc",
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            {" "}
            {text}
          </span>
          <span data-notify="message">{text}</span>
        </div>
      ),
      type: type,
      icon: "ni ni-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  const sendEmail = () => {
    window.location = "mailto:info@singularitydao.ai";
  };

  return (
    <>
      <Section isLoading={isLoading}>
        <GradientBackground />
        <BackgroundContainer />
        <Container className="my-4">
          <div className="rna-wrapper">
            <NotificationAlert ref={notificationAlertRef} />
          </div>
          <Row className="justify-content-center">
            <CustomColumn>
              <Typography size={40} color="white" weight={400}>
                SingularityDAO Airdrop
              </Typography>
              <Typography
                size={16}
                color="white"
                weight={600}
                className="mt-1"
                style={{ textAlign: "justify" }}
              >
                In order to reward the loyalty of our AGI token holders
                community and to achieve greater decentralization of our
                ecosystem, we are airdropping 5,000,000 of SDAO tokens, equal to
                5% of the whole SingularityDAO governance supply to our valued
                community members. The airdrop is reserved for AGI token holders
                and AGI stakers.
                <br />
                Read more:{" "}
                <a
                  href="https://medium.com/singularitydao/singularitydao-updated-airdrop-eb6fc9d2210b"
                  target="_blank"
                >
                  Airdrop Details
                </a>
              </Typography>

              {!account && (
                <div className="mt-4 w-100">
                  <DefaultButton
                    background="interactive2"
                    className="mt-3"
                    onClick={() => setWalletModal(true)}
                  >
                    Connect Your Wallet
                  </DefaultButton>
                </div>
              )}
            </CustomColumn>
          </Row>
          <GradientRow className="mt-5 justify-content-between m-0">
            <div>
              <div className="text-align-center d-inline-block">
                <DetailTitle>Total Pool Amount</DetailTitle>
                <Typography size={16} color="white" weight={600}>
                  875,000 SDAO
                </Typography>
              </div>
            </div>
            <div>
              <div className="text-align-center d-inline-block">
                <DetailTitle>Registration period</DetailTitle>
                <Typography size={16} color="white" weight={600}>
                  Start: May 13th, 00:00 UTC
                </Typography>
                <Typography size={16} color="white" weight={600}>
                  End: May 18th 23:59 UTC
                </Typography>
              </div>
            </div>
            <div>
              <div className="text-align-center d-inline-block">
                <DetailTitle>Claiming Period</DetailTitle>
                <Typography size={16} color="white" weight={600}>
                  From <br />
                  May 20 2021
                  <br /> 12:00 PM UTC
                </Typography>
              </div>
            </div>
          </GradientRow>

          {eligible && (
            <Row>
              <Col lg={5} className="mt-4">
                <SubCard>
                  <SubTitle>Details</SubTitle>
                  <div className="mt-4">
                    <p>Add to metamask to see it in your wallet</p>
                    <DetailLabel2
                      name="Smartcontract"
                      value="0x993864e43caa7f7f12953ad6feb1d1ca635b875f"
                    />
                    <DetailLabel2 name="Token symbol" value="SDAO" />
                    <DetailLabel2
                      name="Total supply"
                      value="100,000,000 SINGDAO"
                    />
                    <DetailLabel2
                      name="Airdrop supply"
                      value="5,000,000 SINGDAO"
                    />
                    <DetailLabel2
                      name="Status"
                      value="Claim period (1st month)"
                    />
                  </div>
                  <div className="mt-3">
                    <DetailLabel2 name="Tokens claimed" value="100 000 SDAO" />
                    <DetailLabel2 name="Tokens left" value="250000 SDAO" />
                  </div>
                </SubCard>
              </Col>
              <Col lg={7} className="mt-4">
                <SubCard>
                  <SubTitle>Claim Tokens </SubTitle>
                  <p>
                    Please make sure your transaction went through on your
                    wallet do not click the button twice
                  </p>
                  <div>
                    <div className="my-3">
                      <Row>
                        <Col lg={8}>
                          <Card className="p-3">
                            <DetailLabel name="Wallet" isDetail={false} />
                            <Typography color="black" size={12} weight={400}>
                              {account}
                            </Typography>
                          </Card>
                        </Col>
                        <Col lg={4}>
                          <Card className="p-3">
                            <DetailLabel name="Status" isDetail={false} />
                            <Typography color="text2" size={12} weight={400}>
                              {hasclaimed ? "Has Claimed" : "Registered"}
                            </Typography>
                          </Card>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4}>
                          <Card className="p-3">
                            <DetailLabel name="Reward type" isDetail={false} />
                            <Typography
                              color="black"
                              size={12}
                              weight={400}
                            ></Typography>
                          </Card>
                        </Col>
                        <Col lg={4}>
                          <Card className="p-3">
                            <DetailLabel name="Balance" isDetail={false} />
                            <Typography color="text2" size={12} weight={400}>
                              {agibalance}
                            </Typography>
                          </Card>
                        </Col>
                        <Col lg={4}>
                          <Card className="p-3">
                            <DetailLabel
                              name="SDAO reward"
                              value=""
                              isDetail={false}
                            />
                            <Typography color="text2" size={12} weight={400}>
                              {sdaoreward}
                            </Typography>
                          </Card>
                        </Col>
                      </Row>
                    </div>

                    <div className="d-flex flex-direction-column align-items-center">
                      <DefaultButton
                        background="interactive2"
                        className="mt-3"
                        onClick={claimTokens}
                        disabled={hasclaimed}
                      >
                        Claim Tokens
                      </DefaultButton>
                    </div>

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
                          Airdrop Successfull!
                        </Typography>
                        <DetailLabel name="Address" value={account} />
                        <DetailLabel
                          name="Amount sent"
                          value={sdaoreward + " SDAO"}
                        />
                        <DetailLabel name="Tx ID" value={txid} />
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
          )}
          <Card className="p-4 mt-5">
            <Typography size={20} weight={600}>
              Airdrop rules
            </Typography>
            <div className="mt-4">
              <StepTitle>Step 1</StepTitle>
              <StepDescription>
                Connect your wallet and check if you are eligible according to
                the airdrop details listed on our{" "}
                <a
                  href="https://medium.com/singularitydao/singularitydao-updated-airdrop-eb6fc9d2210b"
                  target="_blank"
                >
                  blog post announcement
                </a>
              </StepDescription>
            </div>
            <div className="mt-4">
              <StepTitle>Step 2</StepTitle>
              <StepDescription>
                Authorize the connection through your metamask or WEB3 wallet
              </StepDescription>
            </div>
            <div className="mt-4">
              <StepTitle>Step 3</StepTitle>
              <StepDescription>
                Click on the Register button
                <br />
                If you are successful, a pop up will appear confirming that your
                eligible
              </StepDescription>
            </div>
            <div className="mt-4">
              <StepTitle>Step 4</StepTitle>
              <StepDescription>
                A few days after the registration period ends, you can claim
                your tokens on this page. Note that registering will not incur
                Gas costs, but claiming tokens will! When you claim your tokens
                they will be sent to your personal Ethereum address.
              </StepDescription>
              <StepDescription className="mt-2">
                Next airdrop windows:
              </StepDescription>
              <StepDescription>
                When a registration period begins please return to this page to
                register for your new batch of SDAO tokens.
              </StepDescription>
              <StepDescription>
                You can claim your new SDAO tokens a few days after each
                registration period OR let them accumulate and claim them when
                you want, but at the latest 23rd of August 2021! As long as you
                do not claim, the tokens will accumulate in your personal
                account until you do make a claim. At that point all the
                accumulated tokens will be sent to your personal wallet. You
                cannot choose to make a partial claim. For example, if you have
                1000 SDAO ready for claiming in your personal account, when you
                claim you’ll receive the full 1000, you cannot choose a
                different amount to claim.
              </StepDescription>
              <StepDescription className="mt-2">IMPORTANT:</StepDescription>
              <StepDescription>
                1) Claiming is only possible up until the final period on the
                23rd of August. Make sure you have claimed your tokens after the
                last registration period and before the 23rd of August.
              </StepDescription>
              <StepDescription>
                2) Even if you plan to claim all of your tokens at the final
                claiming period you DO NEED to REGISTER for each period
                separately!
              </StepDescription>
            </div>
          </Card>
          <GradientRow className="m-0 p-5 text-align-center">
            <Col className="text-align-center">
              <Typography color="white" size={32} weight={600}>
                Issues in claiming ?
              </Typography>
              <DefaultButton
                background="white"
                color="blue60"
                className="mt-3"
                onClick={sendEmail}
              >
                Contact us
              </DefaultButton>
            </Col>
          </GradientRow>
          <WalletModal
            walletModal={walletModal}
            setWalletModal={setWalletModal}
          />
        </Container>
      </Section>
      {isLoading && <CustomSpinner />}
    </>
  );
}

// {staker
//                              ? "⌛️ Checking"
//                              : eligible
//                              ? "Staker"
//                              : "Holder"}

AirdropPage.layout = Admin;

export default AirdropPage;
