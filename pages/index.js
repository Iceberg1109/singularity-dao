import { Col, Container, Row } from "reactstrap";
import { useRouter } from "next/router";
import { PropTypes } from "prop-types";

import Admin from "layouts/Admin.js";
import Typography from "../components/Typography";
import ForgeBasket from "../components/ForgeBasket";

const ForgePage = () => {
  return (
    <Container className="my-4">
      <Typography color="text1" size={32} weight={600}>
        Staking Portal
      </Typography>
      <Typography color="gray80" size={14}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        <br /> eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <div className="py-4 mt-5">

        <Row className="my-3">
          <Col lg={4}>
            <ForgeBasket   />
          </Col>
          <Col lg={4}>
            <ForgeBasket />
          </Col>
          <Col lg={4}>
            <ForgeBasket />
          </Col>
        </Row>
      </div>
    </Container>
  );
};

ForgePage.layout = Admin;

export default ForgePage;
