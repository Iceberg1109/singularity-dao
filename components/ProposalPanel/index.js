
import React, { useEffect, useState } from "react";
import { Row, Col, Badge, Progress } from "reactstrap";
import styled from "styled-components";
import Typography, {
  ProposalStatusTypography,
  TruncateTypography,
} from "../Typography";
import { BlueButton, PrimaryButton } from "../Buttons";

const ProposalContainer = styled(Row)`
  padding: 26px 42px;
`;

const ProposalPanel = ({ proposal, hasvotes }) => {
  const [fors,setFors] = useState(0);
  const [against,setAgainst] = useState([]);

  const getProposalStatus = (state) => {
    return state == 0 ? "active" : "failed";
  };

   // useEffect(() => {
    
   //  if(hasvotes){

   //      const sweeterArray = proposal.votes.map(vote => {
      
   //      if(vote.option){

   //        fors +1
   //      }else{
   //        against + 1
   //      }

   //   })
   //  }

   //  console.log(sweeterArray)

   //  }, );


// {proposal.title}
  return (
    <ProposalContainer>
      <Col lg={4}>
        <TruncateTypography weight={600} size={20}>
         New dynaset proposal
        </TruncateTypography>
        <div className="d-flex">
          <ProposalStatusTypography status={getProposalStatus(proposal.state)}>
            <span className="mr-1">●</span>
            {getProposalStatus(proposal.state)}
          </ProposalStatusTypography>
          <Typography className="mx-3" transform="uppercase">
            {proposal.symbol}
          </Typography>
          <Typography>Time left 1d 9h 16m</Typography>
        </div>
      </Col>
      <Col lg={5}>
        <Badge className="badge-lg" color="success">
          Category
        </Badge>
      </Col>
      <Col lg={3}>
        {proposal.state == 0 ? (
          <>
            <div>
              <div className="d-flex justify-content-between">
                <Typography color="gray" size={12} weight={400}>
                  For
                </Typography>
                <Typography color="gray" size={12} weight={400}>
                  {proposal.for}%
                </Typography>
              </div>
              <Progress
                className="progress-xs mb-0"
                color="success"
                max="100"
                value={proposal.for}
              />
            </div>
            <div className="mt-2">
              <div className="d-flex justify-content-between">
                <Typography color="gray" size={12} weight={400}>
                  Against
                </Typography>
                <Typography color="gray" size={12} weight={400}>
                  {proposal.against}%
                </Typography>
              </div>
              <Progress
                className="progress-xs mb-0"
                color="danger"
                max="100"
                value={proposal.against}
              />
            </div>
          </>
        ) : (
          <div className="d-flex justify-content-end align-items-center h-100">
            <BlueButton>Vote</BlueButton>
          </div>
        )}
      </Col>
    </ProposalContainer>
  );
};

export default ProposalPanel;
