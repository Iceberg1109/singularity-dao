import { Col, Container, Row } from "reactstrap";
import { useRouter } from "next/router";
import { PropTypes } from "prop-types";

import Admin from "layouts/Admin.js";
import Typography from "../components/Typography";
import ForgeBasket from "../components/ForgeBasket";
import Sidebar from "components/Sidebar/Sidebar.js";

const ForgePage = () => {
  return (
    <Container className="my-4">
      <Typography color="text1" size={32} weight={600}>
        Yield Farming
      </Typography>
      <Typography color="text1" size={16} weight={400}>
        Maximize your return by staking your SDAO LP tokens.
      </Typography>
      <a href="#">Learn more</a>
      <div className="py-4 mt-5">
        <Row className="my-3">
          <Col lg={4}>
            <ForgeBasket title="SDAO/ETH Pool" apy=""/>
          </Col>
          <Col lg={4}>
            <ForgeBasket title="AGIX/ETH Pool" apy=""/>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

ForgePage.layout = Admin;

export default ForgePage;
