import { Col, Container, Row } from "reactstrap";
import { useRouter } from "next/router";
import { PropTypes } from "prop-types";

import Admin from "layouts/Admin.js";
import Typography from "../../components/Typography";
import ForgeBasket from "../../components/ForgeBasket";
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
     
      <div className="py-4 mt-5">
        <Row className="my-3">
          <Col lg={4}>
            <ForgeBasket title="SDAO/ETH Pool" apy="" poolid="0" name="SDAO LP" address="0x4c78b6566864ae6304c2c2a4c43b74dafaac167e" />
          </Col>
          <Col lg={4}>
            <ForgeBasket title="AGIX/ETH Pool" apy="" poolid="1" name="AGIX LP" address="0x5318855ad173220e446002c01d5ee5f940502e70" />
          </Col>
        </Row>
      </div>
    </Container>
  );
};
// <a href="#">Learn more</a>
ForgePage.layout = Admin;

export default ForgePage;
