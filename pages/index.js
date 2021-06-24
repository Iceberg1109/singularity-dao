/*eslint-disable*/
import React from "react";
import Link from "next/link";
// reactstrap components
import { Badge, Button, Card, CardBody, Container, Row, Col, UncontrolledTooltip } from "reactstrap";
// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import Admin from "layouts/Admin.js";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    width:"100%",
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));



const Index = () => {
   const classes = useStyles();
  const show = false;
  return (
    <Container className="my-2">
      <section className="py-6 pb-9 bg-white">
        <Container fluid>
          <Row className="justify-content-center text-center">
            <Col md="6">
              <h2 className="display-3 text-black">How it works</h2>
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
                      <img alt="..." className="img-fluid" src={require("assets/img/connect_wallet.svg")} />
                      <h4 className="h3 text-dark text-uppercase">Connect your wallet</h4>
                      <p className="description mt-3">
                        Connect your Ethereum wallet to get started. No registration required.
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4">
                  <Card className="card shadow border-0">
                    <CardBody className="py-5">
                      <img alt="..." className="img-fluid" src={require("assets/img/liquidity_provider.svg")} />
                      <h4 className="h3 text-dark text-uppercase">Become a liquidity provider</h4>
                      <p className="description mt-3">
                        Provide Liquidity in SDAO/ETH and AGIX/ETH pools to begin earning LP tokens.
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4">
                  <Card className="card shadow border-0">
                    <CardBody className="py-5">
                      <img alt="..." className="img-fluid" src={require("assets/img/yield_farming.svg")} />
                      <h4 className="h3 text-dark text-uppercase">Earn SDAO with Yield Farming</h4>
                      <p className="description mt-3">
                        Stake your LP tokens in our Yield Farming portal to earn additional SDAO rewards.
                      </p>
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
              <img alt="..." className="img-fluid" src={require("assets/img/getsdao.svg")} />
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
                  To interact with SingularityDAO platform, first connect your wallet. Swap ETH into SDAO using the swap
                  function. To provide liquidity you will need equal values of ETH and AGIX/SDAO.
                </p>
                <Link href="/swap">
                  <a className="font-weight-bold text-purple mt-5">Buy SDAO -></a>
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
              <img alt="..." className="img-fluid" src={require("assets/img/trading_fees.svg")} />
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
                  When you add liquidity to either the SDAO/ETH or AGIX/ETH Liquidity Pool, you earn trading fees and
                  receive LP tokens. LP tokens represent a crypto liquidity provider’s share of a pool, and the crypto
                  liquidity provider remains entirely in control of the token.
                </p>
                <Link href="/pools">
                  <a className="font-weight-bold text-purple mt-5">Get LP tokens -></a>
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
              <img alt="..." className="img-fluid" src={require("assets/img/how_staking.svg")} />
            </Col>
            <Col className="order-md-1" md="6">
              <div>
                <Badge color="info" pill>
                  step 3
                </Badge>
              </div>
              <div className="pr-md-5">
                <h1>Maximize your earnings with Yield Farming</h1>
                <p>
                  Deposit the LP tokens into the SingDAO staking pool and maximize your earning. By staking LP tokens
                  your liquidity works double-time earning fees and farming yield.
                </p>
                <Link href="/farms">
                  <a className="font-weight-bold text-purple mt-5">Farm now -></a>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {show ? (
        <section className="py-7 section-nucleo-icons bg-white overflow-hidden">
          <Container>
            <Row className="justify-content-center">
              <Col className="text-center" lg="8">
                <h2 className="display-3">No Yield Farming? Stake anytime</h2>
                <p className="lead">With SingularityDAO, you can swap, stake, and farm your assets in easy steps.</p>
                <div className="btn-wrapper">
                  <Button color="info" href="" target="_blank">
                    stake
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
        ""
      )}
        <section className="py-7 section-nucleo-icons  overflow-hidden">
          <Container>
          <h2 className="display-3 text-black">FAQ</h2>
          
            <Row >
       <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>What is Token Swapping?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
        A - Token swapping is the process of instantaneously exchanging one cryptocurrency to another in a decentralised manner.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>What is a Liquidity Provider?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           A - A liquidity provider is a user who funds a liquidity pool with crypto assets she owns to facilitate trading on the platform and earn passive income on her deposit.
          </Typography>
        </AccordionDetails>
      </Accordion>
            <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>What is Yield Farming?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           A - Yield farming is the practice of staking or lending crypto assets in order to generate high returns or rewards in the form of additional cryptocurrency.
          </Typography>
        </AccordionDetails>
      </Accordion>
            <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>What is Impermanent Loss?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A - Impermanent loss describes the temporary loss of funds occasionally experienced by liquidity providers because of volatility in a trading pair. This also illustrates how much more money someone would have had if they simply held onto their assets instead of providing liquidity.
          </Typography>
        </AccordionDetails>
      </Accordion>
            <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Should I add liquidity to AGIX or SDAO?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A - It is possible to provide liquidity for both AGIX/ETH and SDAO/ETH, it is entirely up to you which to choose. There are 500,000 tokens to be distributed in the first 60 days. 100,000 will go to AGIX/ETH liquidity providers and 400,000 will go to SDAO/ETH liquidity providers. You will need to stake your LP tokens in the Yield Farming portal, to claim these rewards.
          </Typography>
        </AccordionDetails>
      </Accordion>
            <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Is it possible to stake my LP tokens and earn SDAO? Where?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           A - It most certainly is! RIGHT HERE->
          </Typography>
        </AccordionDetails>
      </Accordion>

               <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>How do I see the new tokens in my wallet?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A - Our platform is compatible with MetaMask, WalletConnect, Coinbase Wallet, Fortmatic and Portis.

          </Typography>
           <Typography>
                  PC - You can click the “connect wallet” button and then choose the appropriate method.
          </Typography>
             <Typography>
                 Mobile - Most wallets will have either a DApp browser for connecting, or use WalletConnect or MetaMask.
          </Typography>
                <Typography>
             Ledger - User Ledger Live to connect to MetaMask, and then connect through the MetaMask app.
          </Typography>

        </AccordionDetails>
      </Accordion>

            </Row>
          </Container>
        </section>
    </Container>
  );
};

Index.layout = Admin;

export default Index;
