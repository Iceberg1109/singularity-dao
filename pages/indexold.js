import React, { useEffect } from "react";
// reactstrap components
import { Card, Container, Row, Col } from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";

import FeaturedSet from "../components/FeaturedSet";
import SetsTable from "../components/SetsTable";
import Typography, { GradientTypography } from "components/Typography";
import styled from "styled-components";
import { client } from "../apollo/client";
import { INDEX_POOLS } from "../apollo/queries";

const StepDescription = styled(Typography)`
  font-size: 14px;
  padding-left: 6px;
`;

const StepTitle = styled(GradientTypography)`
  font-size: 18px;
  color: #ffff;
  font-weight: 600;
  margin-bottom: 15px;
`;

const DetailTitle = styled(GradientTypography)`
  font-size: 18px;
  color: #ffff;
  font-weight: 600;
  margin-bottom: 15px;
`;

const SubTitle = styled(Typography)`
  font-size: 20px;
  color: #ffff;
  font-weight: 600;
`;

function Dashboard({ pools }) {
  return (
    <Container className="my-4" >
      {pools && (
        <div>
          <h2>Featured Sets</h2>
          <Row className="p-2 mb-4">
            {pools.slice(0, 3).map((pool) => (
              <Col lg={4} key={pool.id}>
                <FeaturedSet pool={pool} />
              </Col>
            ))}
          </Row>
        </div>
      )}
      {pools && (
        <div>
          <h2>All Sets</h2>
          <Row className="p-2" >
            <Col>
              <Card >
                <SetsTable pools={pools} />
              </Card>
            </Col>
          </Row>
        </div>
      )}

      <Card
        className="justify-content-center"
        style={{
          background: "linear-gradient(90deg, #4100CA 0%, #224BDB 100%)",
          height: "400px",
        }}
      ></Card>
    </Container>
  );
}

export async function getServerSideProps() {
  const res = await client.query({
    query: INDEX_POOLS,
  });

  const { data } = res;

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pools: data.indexPools,
    },
  };
}

Dashboard.layout = Admin;

export default Dashboard;
