import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Card,
  Container,
  Row,
  Col,
  CardHeader,
  CardBody,
  ListGroupItem,
  ListGroup,
  CardFooter,
  Progress,
  Table,
} from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";

import Typography, {
  GradientTypography,
  ProposalStatusTypography,
} from "../../components/Typography";
import { useRouter } from "next/router";
import CardTab from "../../components/Tabs";
import ProposalPanel from "../../components/ProposalPanel";
import { BlueButton, PrimaryButton } from "../../components/Buttons";
import Tabs from "../../components/Tabs";
import styled from "styled-components";
import ProposalCreatedByPanel from "../../components/ProposalCreatedByPanel";
import ProposalHistoryPanel from "../../components/ProposalHistoryPanel";
import { PROPOSAL, proposalQuery } from "../../apollo/queries";
import { client } from "../../apollo/client";
import LiquidDemocracyABI from "../../assets/constants/abi/LiquidDemocracy.json";
import { useUser } from "../../components/UserContext";
import web3 from "web3";
import {
  ChainId,
  Token,
  WETH,
  Trade,
  TokenAmount,
  TradeType,
  Fetcher,
  Route,
  Percent,
} from "@uniswap/sdk";
import { ethers } from "ethers";
import formatAddress from "../../utils/format-address";

function ProposalPage({ proposal }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const { library, account } = useUser();

  const getProposalStatus = (state) => {
    return state == 0 ? "active" : "failed";
  };

  const vote = async () => {
    const signer = await library.getSigner(account);

    const Dynaset = new ethers.Contract(
      "0x2CB802e3568277181043BF6389cc41576cAfe2B8",
      LiquidDemocracyABI.abi,
      signer
    );

    const tx = await Dynaset.castVote(proposal.id, true, {
      gasLimit: 210000,
      gasPrice: web3.utils.toWei("120", "gwei"),
    });

    console.log(`Transaction hash: ${tx.hash}`);

    const receipt = await tx.wait();

    console.log(`Transaction was mined in block ${receipt.blockNumber}`);
  };

  //  {proposal.title}
  return (
    <Container className="my-4" >
      <Row className="mt-3" >
        <Col lg={8}>
          <Card style={{backgroundColor:'#212121'}}>
            <CardHeader className="d-flex justify-content-between" style={{backgroundColor:'#212121'}}>
              <div>
                <Typography size={32} weight={600}>
                  New dynaset proposal
                </Typography>
                <div className="d-flex">
                  <ProposalStatusTypography
                    status={getProposalStatus(proposal.state)}
                  >
                    <span className="mr-1">●</span>
                    {getProposalStatus(proposal.state)}
                  </ProposalStatusTypography>
                  <Typography
                    className="mx-3"
                    color="gray"
                    transform="uppercase"
                  >
                    {/* {proposal.symbol} */}
                  </Typography>
                  <Typography spanWeight={600}>
                    Executed on <span>15/04/2021</span>
                  </Typography>
                  <Typography className="mx-1">/</Typography>
                  <Typography spanWeight={600}>
                    Time left <span>1d 9h 16m</span>
                  </Typography>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <BlueButton onClick={vote}>Vote</BlueButton>
              </div>
            </CardHeader>
            <CardHeader style={{backgroundColor:'#212121'}}>
              <div className="mb-5">
                <div className="d-flex justify-content-between">
                  <Typography color="gray" size={14} weight={400}>
                    For
                  </Typography>
                  <Typography color="gray" size={14} weight={400}>
                    Against
                  </Typography>
                </div>
                <Progress multi>
                  <Progress bar color="success" value={proposal.for}></Progress>
                  <Progress
                    bar
                    color="transparent"
                    value={100 - proposal.for - proposal.against}
                  ></Progress>
                  <Progress
                    bar
                    color="danger"
                    value={proposal.against}
                  ></Progress>
                </Progress>
              </div>
              <Tabs
                tabs={["Details", "Voting history"]}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </CardHeader>
            <CardBody className="p-0">
              {activeTab === 0 ? (
                <div className="p-4">
                  <div className="mb-4">
                    <Typography size={18} weight={600} className="mb-2">
                      Summary
                    </Typography>
                    <Typography size={14} className="ml-2">
                      {proposal.description}
                    </Typography>
                  </div>
                  <div className="mb-4">
                    <Typography size={18} weight={600} className="mb-2">
                      Objective
                    </Typography>
                    <Typography size={14} className="ml-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </Typography>
                  </div>
                  <div>
                    <Typography size={18} weight={600} className="mb-2">
                      Methodology
                    </Typography>
                    <Typography size={14} className="ml-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </Typography>
                  </div>
                </div>
              ) : (
                <Table
                  className="align-items-center table-flush votes-table"
                  responsive
                >
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Address</th>
                      <th scope="col">Votes</th>
                      <th scope="col">Address</th>
                      <th scope="col">Votes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proposal.votes.map((vote) => (
                      <tr>
                        <td>{formatAddress(vote.voter)}</td>
                        <td>{vote.weight}</td>
                        <td>{formatAddress(vote.voter)}</td>
                        <td>{vote.weight}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </CardBody>
          </Card>
        </Col>
        <Col lg={4}>
          <ProposalCreatedByPanel proposer={proposal.proposer} />
          <ProposalHistoryPanel />
        </Col>
      </Row>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const res = await client.query({
    query: PROPOSAL,
    variables: {
      id: context.query.id,
    },
  });

  const { data } = res;

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      proposal: data.proposal,
    },
  };
}

ProposalPage.layout = Admin;

export default ProposalPage;
