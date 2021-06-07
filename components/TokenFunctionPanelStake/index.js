import { useState } from "react";
import { Row, Card, Col } from "reactstrap";
import styled from "styled-components";
import StakePanel from "./StakePanel";
import Typography from "../Typography";
// import BurnPanel from "./BurnPanel";
// import SwapPanel from "./SwapPanel";

const MainCard = styled(Card)`
  padding: 40px;
  max-width: 800px;
  color: #ffffff;
  background-clip: padding-box;
  height: 85%;
  margin-left: auto;
  margin-right: auto;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: -2px;
    border-radius: inherit;
    background: ${({ theme }) => theme.color.gradient2};
  }
`;

const TokenFunctionTab = styled.div`
  border: ${({ theme }) => `1px solid ${theme.color.default}`};
  background-color: ${({ theme, active }) => (active ? theme.color.default : "")};
  color: ${({ theme, active }) => (active ? theme.color.white : theme.color.default)};
  cursor: pointer;
  padding: 4px 10px;
  font-size: 16px;
  font-weight: 600;
  width: 120px;
  text-align: center;
  height: 35px;
  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &:not(:last-child) {
    border-right: 0;
  }

  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

const TabContainer = styled(Row)`
  justify-content: center;
  margin-bottom: 5vh;
`;

const TokenFunctionPanel = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {/* <MainCard>
   <div className="d-flex justify-content-between">
        <Typography size={15} style={{ textAlign: "left" }}>
          Total Staked
        </Typography>
     
      </div>
            <Typography size={20} style={{ textAlign: "left" }}>
          1,250 SDAO LP 
        </Typography>
      </MainCard>

      <MainCard>

        {activeTab === 0 && <StakePanel type={true} />}
      </MainCard> */}

      <Col lg={7}>
        {/* <TokenFunctionPanel /> */}
        <Card className="p-4">
          <Typography size={14}>Total Staked</Typography>
          <Typography size={24}>1250 SDAO LP</Typography>
          <div className="d-flex justify-content-between mt-3">
            <Typography size={14}>SDAO Earned</Typography>
            <Typography size={14}>0.000</Typography>
          </div>
          <div className="d-flex justify-content-between">
            <Typography size={14}>Withdrawable stake</Typography>
            <Typography size={14}>1250 SDAO LP</Typography>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <Typography size={14}>Max stake per user</Typography>
            <Typography size={14}>1500 SDAO LP</Typography>
          </div>
          <div className="d-flex justify-content-between">
            <Typography size={14}>APY return</Typography>
            <Typography size={14}>34.7%</Typography>
          </div>
          <div className="d-flex justify-content-between">
            <Typography size={14}>Ends in</Typography>
            <Typography size={14}>1703000 block</Typography>
          </div>
        </Card>
      </Col>
      <Col lg={5}>
        {/* <TokenFunctionPanel /> */}
        <Card className="p-4">
          <StakePanel />
        </Card>
      </Col>
    </>
  );
};

// <TokenFunctionTab
//   active={activeTab === 2}
//   onClick={() => setActiveTab(2)}
// >
//   Stake
// </TokenFunctionTab>
// <TokenFunctionTab
//   active={activeTab === 3}
//   onClick={() => setActiveTab(3)}
// >
//   Swap
// </TokenFunctionTab>

export default TokenFunctionPanel;
