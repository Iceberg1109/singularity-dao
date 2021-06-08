import { Col, Container, Row } from "reactstrap";
import { useRouter } from "next/router";
import { PropTypes } from "prop-types";

import Admin from "layouts/Admin.js";
import Typography from "../components/Typography";
import ForgeBasket from "../components/PoolBasket";

const ForgePage = () => {
  return (
    <Container className="my-4">
      <Typography color="text1" size={32} weight={600}>
        Liquidity
      </Typography>
      <Typography color="gray80" size={14}>
        Select one of the liquidity pools available, then add liquidity and start to earn fees.
      </Typography>
      <a href="#">Learn more.</a>
      <div className="py-4 mt-5">
        <Row className="my-3">
          <Col lg={4}>
            <ForgeBasket title="SDAO/USDT Pool" />
          </Col>
          <Col lg={4}>
            <ForgeBasket title="SDAO/WETH Pool" />
          </Col>
          <Col lg={4}>
            <ForgeBasket title="AGIX/SDAO Pool" />
          </Col>
        </Row>
      </div>
    </Container>
  );
};

ForgePage.layout = Admin;

export default ForgePage;
