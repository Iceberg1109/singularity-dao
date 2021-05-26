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
} from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";

import Typography, { GradientTypography } from "../components/Typography";
import { useRouter } from "next/router";
import Tabs from "../components/Tabs";
import ProposalPanel from "../components/ProposalPanel";
import { LIQUID_DEMOCRACY } from "../apollo/queries";
import { client } from "../apollo/client";

function GovernancePage({ proposals }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  const redirectToProposal = (id) => {
    router.push({ pathname: `/proposal/${id}`, query: { id } });
  };

  return (
    <Container className="my-4">
      <Typography size={32} weight={600}>
        Governance
      </Typography>
      <Row className="mt-3">
        <Col lg={3} >
          <Card className="p-4" style={{backgroundColor:'#212121'}}>
            <Typography weight={600} size={40}>
              45,000,000
            </Typography>
            <Typography size={14} weight={700} color="gray">
              SINGDAO
            </Typography>
          </Card>
        </Col>
        <Col lg={3}>
          <Card className="p-4" style={{backgroundColor:'#212121'}}>
            <Typography weight={600} size={40}>
              4
            </Typography>
            <Typography size={14} weight={700} color="gray">
              ACTIVE PROPOSALS
            </Typography>
          </Card>
        </Col>
        <Col lg={3}>
          <Card className="p-4" style={{backgroundColor:'#212121'}}>
            <Typography weight={600} size={40}>
              5,336,054
            </Typography>
            <Typography size={14} weight={700} color="gray">
              VOTES
            </Typography>
          </Card>
        </Col>
        <Col lg={3}>
          <Card className="p-4" style={{backgroundColor:'#212121'}}>
            <Typography weight={600} size={40}>
              2546
            </Typography>
            <Typography size={14} weight={700} color="gray">
              VOTING ADDRESSES
            </Typography>
          </Card>
        </Col>
      </Row>

      <Card className="mt-2" style={{backgroundColor:'#212121'}}>
        <CardHeader style={{backgroundColor:'#212121'}}>
          <Typography size={20} weight={600}>
            List of proposals
          </Typography>
        </CardHeader>
        <CardHeader className="py-2" style={{backgroundColor:'#212121'}}>
          <Tabs
            tabs={["Active", "Past"]}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </CardHeader>
        <CardBody className="p-0">
          <ListGroup className="list" flush>
            {proposals?.map((proposal) => (
              <ListGroupItem
                className="px-0"
                onClick={() => redirectToProposal(proposal.id)}
                key={proposal.id}
                style={{backgroundColor:'#212121'}}
              >
                <ProposalPanel proposal={proposal} />

              </ListGroupItem>
            ))}
            {/* <Link href={`/proposal/${id}`}>
              <ListGroupItem className="px-0">
                <ProposalPanel
                  status="active"
                  title="Proposal title"
                  symbol="DYN-24"
                />
              </ListGroupItem>
            </Link>

            <ListGroupItem className="px-0">
              <ProposalPanel
                status="passed"
                title="Proposal title"
                symbol="DYN-24"
                vote={{ for: 47, against: 32 }}
              />
            </ListGroupItem> */}
          </ListGroup>
        </CardBody>
        <CardFooter style={{backgroundColor:'#212121'}}>
          <Typography
            color="gray100"
            size={16}
            weight={600}
            className="text-align-center"

          >
            View all proposals
          </Typography>
        </CardFooter>
      </Card>
    </Container>
  );
}

export async function getServerSideProps() {
  const res = await client.query({
    query: LIQUID_DEMOCRACY,
  });

  const { data } = res;

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      proposals: data.proposals,
    },
  };
}

GovernancePage.layout = Admin;

export default GovernancePage;
