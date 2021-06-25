import { Col, Container, Row } from "reactstrap";
import React from "react";
import Admin from "layouts/Admin.js";
import Typography from "../../components/Typography";
import ForgeBasket from "../../components/PoolBasket";

//["0x5e94577b949a56279637ff74dfcff2c28408f049", "0xc778417e063141139fce010982780140aa0cd5ab"],

// 1: ["0x993864e43caa7f7f12953ad6feb1d1ca635b875f", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"],
//     3: ["0x5e94577b949a56279637ff74dfcff2c28408f049", "0xc778417e063141139fce010982780140aa0cd5ab"],
// const baskets = [
//   {
//     poolId: "SDAO-ETH",
//     apy: "13%",
//     share: "0.005",
//     tokens: {
//       1: ["0x993864e43caa7f7f12953ad6feb1d1ca635b875f", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"],
//       3: ["0x5e94577b949a56279637ff74dfcff2c28408f049", "0xc778417e063141139fce010982780140aa0cd5ab"],
//     },
//   },
//   // {
//   //   key: "WETH-AGIX",
//   //   poolId: "AGIX-WETH",
//   //   liquidity: "407004",
//   //   apy: "4.82",
//   //   share: "0.005",
//   //   tokens: [
//   //     "0x5e94577b949a56279637ff74dfcff2c28408f049",
//   //     "0xa898150fef6ac506476e70f9bf1c03a11b55bdf9"
//   //   ]
//   // },
// ];

function ForgePage(){
  const baskets = [
    {
      poolId: "SDAO-ETH",
      apy: "13%",
      share: "0.005",
      tokens: {
        1: ["0x993864e43caa7f7f12953ad6feb1d1ca635b875f", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"],
        3: ["0x5e94577b949a56279637ff74dfcff2c28408f049", "0xc778417e063141139fce010982780140aa0cd5ab"],
      },
    },
    // {
    //   key: "WETH-AGIX",
    //   poolId: "AGIX-WETH",
    //   liquidity: "407004",
    //   apy: "4.82",
    //   share: "0.005",
    //   tokens: [
    //     "0x5e94577b949a56279637ff74dfcff2c28408f049",
    //     "0xa898150fef6ac506476e70f9bf1c03a11b55bdf9"
    //   ]
    // },
  ];
  
  return (
    <Container className="my-4">
      <Typography color="text1" size={32} weight={600}>
        Liquidity
      </Typography>
      <Typography color="gray80" size={14}>
        Select one of the liquidity pools available, then add liquidity and start to earn fees.
      </Typography>
  
      <div className="py-4 mt-5">
        <Row className="my-3">
          {baskets.map((basket) => (
            <Col lg={4} key={basket.poolId}>
              <ForgeBasket title={basket.poolId} apy={basket.apy} tokens={basket.tokens} />
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};
//    <a href="#">Learn more.</a>
ForgePage.layout = Admin;

export default ForgePage;
