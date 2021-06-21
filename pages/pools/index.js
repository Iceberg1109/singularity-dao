import { Col, Container, Row } from "reactstrap";
import { useRouter } from "next/router";
import { PropTypes } from "prop-types";

import Admin from "layouts/Admin.js";
import Typography from "../../components/Typography";
import ForgeBasket from "../../components/PoolBasket";

const baskets = [
  {
    poolId: "SDAO-WETH",
    liquidity: "407004",
    apy: "4.82",
    share: "0.005",
    tokens: [
      "0x5e94577b949a56279637ff74dfcff2c28408f049",
      "0xc778417e063141139fce010982780140aa0cd5ab"
    ]
  },
  {
    key: "WETH-AGIX",
    poolId: "SDAO-AGIX",
    liquidity: "407004",
    apy: "4.82",
    share: "0.005",
    tokens: [
      "0x5e94577b949a56279637ff74dfcff2c28408f049",
      "0xa898150fef6ac506476e70f9bf1c03a11b55bdf9"
    ]
  },
];

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
          {baskets.map((basket) => (
            <Col lg={4} key={basket.poolId}>
              <ForgeBasket
                title={basket.poolId}
                pool={basket.poolId}
                liquidity={basket.liquidity}
                apy={basket.apy}
                share={basket.share}
                tokens={basket.tokens}
              />
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

ForgePage.layout = Admin;

export default ForgePage;
