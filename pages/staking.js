import { Col, Container, Row } from "reactstrap";
import { useRouter } from "next/router";
import { PropTypes } from "prop-types";

import Admin from "layouts/Admin.js";
import Typography from "../components/Typography";
import ForgeBasket from "../components/StakingBasket";
import Sidebar from "components/Sidebar/Sidebar.js";

const ForgePage = () => {
  return (
    <Container className="my-4">
      <Typography color="text1" size={32} weight={600}>
        Staking
      </Typography>
      <Typography color="text1" size={16} weight={400}>
        Maximize your return by staking your SDAO tokens.
      </Typography>
   
      <div className="py-4 mt-5">
        <Row className="my-3">
          <Col lg={4}>
            <ForgeBasket title="SDAO Staking" apy={"22.5%"} />
          </Col>
        </Row>
      </div>
    </Container>
  );
};
//   <a href="#">Learn more</a>

ForgePage.layout = Admin;

export default ForgePage;
