
/*eslint-disable*/
import React from "react";
import Link from "next/link";
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import Admin from "layouts/Admin.js";

const  Index = () => {
  return (

       <Container className="my-2">
        <section className="py-6 pb-9 bg-white">
          <Container fluid>
            <Row className="justify-content-center text-center">
              <Col md="6">
                <h2 className="display-3 text-black">
                 How it works
                </h2>
                <p className="lead text-black">
                 With SingularityDAO, you can swap, stake, and farm your assets in easy steps.
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section section-lg pt-lg-0 mt--7">
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                <Row>
                  <Col lg="4">
                    <Card className="card shadow border-0">
                      <CardBody className="py-5">
                       <img
                          alt="..."
                          className="img-fluid"
                          src={require("assets/img/connect_wallet.svg")}
                        />
                        <h4 className="h3 text-dark text-uppercase">
                          Connect your wallet
                        </h4>
                        <p className="description mt-3">
                         Connect your wallet and discover the benefits of DeFi! No registration or account needed.
                        </p>
                        <div>
                          <Badge color="info" pill>
                            1 step
                          </Badge>
                      
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card shadow border-0">
                      <CardBody className="py-5">
                       <img
                          alt="..."
                          className="img-fluid"
                          src={require("assets/img/liquidity_provider.svg")}
                        />
                        <h4 className="h3 text-dark text-uppercase">
                          Become a liquidity provider
                        </h4>
                        <p className="description mt-3">
                          Start contributing in Liquidity Pools and earn free tokens. Yeah, is that easy!
                        </p>
                        <div>
                             <Badge color="info" pill>
                            2 step
                          </Badge>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card shadow border-0">
                      <CardBody className="py-5">
                         <img
                          alt="..."
                          className="img-fluid"
                          src={require("assets/img/yield_farming.svg")}
                           />
                        <h4 className="h3 text-dark text-uppercase">
                          Earn SDAO with Yield Farming
                        </h4>
                        <p className="description mt-3">
                         Are you brave enough for an higher APR? Farm your LP tokens to earn more SDAO, now.
                        </p>
                        <div>
                          <Badge color="info" pill>
                            3 step
                          </Badge>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="py-6">
          <Container>
          
            <Row className="row-grid align-items-center">
              <Col className="order-md-2" md="6">

                <img
                  alt="..."
                  className="img-fluid"
                  src={require("assets/img/getsdao.svg")}
                />
              </Col>
              <Col className="order-md-1" md="6">
                <div>
               <Badge color="info" pill>
                   step 1
                </Badge>
            </div>
                <div className="pr-md-5">
                  <h1>Get your SDAO</h1>
                  <p>
                     Are you ready to enter into the DeFi World? To interact with SingularityDAO platform, first connect your wallet. Swap your WETH into SDAO using the swap function. Then go further into the next steps!
                  </p>
                <Link href="/swap">
                    <a className="font-weight-bold text-purple mt-5">
                      Buy SDAO ->
                    </a>
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="py-6">
          <Container>
            <Row className="row-grid align-items-center">
              <Col md="6">
                <img
                  alt="..."
                  className="img-fluid"
                  src={require("assets/img/trading_fees.svg")}
                />
              </Col>
              <Col md="6">
                 <div>
               <Badge color="info" pill>
                   step 2
                </Badge>
            </div>
                <div className="pr-md-5">
                  <h1>Earn trading fees, get LP tokens now</h1>
                  <p>
                    LP tokens are the key! When you add liquidity to a Liquidity Pool, you get SDAO LP tokens in return. LP tokens represent a crypto liquidity provider’s share of a pool, and the crypto liquidity provider remains entirely in control of the token.
                  </p>
                  <Link href="/pools">
                    <a className="font-weight-bold text-purple mt-5">
                      Get LP tokens ->
                    </a>
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="py-6">
          
          <Container>
            <Row className="row-grid align-items-center">
              <Col className="order-md-2" md="6">
                <img
                  alt="..."
                  className="img-fluid"
                  src={require("assets/img/how_staking.svg")}
                />
              </Col>
              <Col className="order-md-1" md="6">
               <div>
               <Badge color="info" pill>
                   step 3
                </Badge>
            </div>
                <div className="pr-md-5">
                  <h1>Maximize your earnings with Yeld Farming</h1>
                  <p>
                   Now that you have LP tokens, what’s next? Deposit those LP tokens into the SingDAO staking pool and maximize your earning. Staking your LP tokens your liquidity works double-time earning fees and farming yields.
                  </p>
                  <Link href="/farms">
                    <a className="font-weight-bold text-purple mt-5">
                     Farm now ->
                    </a>
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="py-7 section-nucleo-icons bg-white overflow-hidden">
          <Container>
            <Row className="justify-content-center">
              <Col className="text-center" lg="8">
                <h2 className="display-3">No Yield Farming? Stake anytime</h2>
                <p className="lead">
                  With SingularityDAO, you can swap, stake, and farm your assets in easy steps.
                </p>
                <div className="btn-wrapper">
                  <Button
                    color="info"
                    href=""
                    target="_blank"
                  >
                    stake
                  </Button>
                
                </div>
              </Col>
            </Row>
  
          </Container>
        </section>

    </Container>

  );
}

Index.layout = Admin;

export default Index;
