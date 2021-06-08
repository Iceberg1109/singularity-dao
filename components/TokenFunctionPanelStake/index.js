import { useState } from "react";
import { Row, Card, Col } from "reactstrap";
import styled from "styled-components";
import StakePanel from "./StakePanel";
import Typography from "../Typography";
import DetailLabel from "./DetailLabel";
import RewardStakePanel from "./RewardStakePanel";
// import BurnPanel from "./BurnPanel";
// import SwapPanel from "./SwapPanel";

const MainCard = styled(Card)`
  padding: 40px;
  color: #ffffff;
  background-clip: padding-box;
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
  background-color: ${({ theme, active }) =>
    active ? theme.color.default : ""};
  color: ${({ theme, active }) =>
    active ? theme.color.white : theme.color.default};
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
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      {activeTab === 0 ? (
        <div>
          <Typography size={32} weight={600}>
            Stake
          </Typography>
          <Typography size={16} weight={400} className="mb-4">
            Maximize your return by staking your SDAO LP tokens.
          </Typography>
          <Row>
            <Col lg={6}>
              <MainCard>
                <div className="d-flex justify-content-between">
                  <Typography size={15} style={{ textAlign: "left" }}>
                    Total Staked
                  </Typography>
                </div>
                <Typography
                  size={20}
                  style={{ textAlign: "left" }}
                  className="mb-3"
                >
                  1,250 SDAO LP
                </Typography>
                <DetailLabel title="SDAO earned" desc="0.0000" />
                <DetailLabel title="Withdrawable stake" desc="1,250 SDAO LP" />
                <div className="mb-3"></div>
                <DetailLabel title="Max stake per user" desc="1,500 SDAO LP" />
                <DetailLabel title="Max stake per user" desc="34.74 %" />
                <DetailLabel title="Ends in" desc="1,703,000 blocks" />
              </MainCard>
            </Col>

            <Col lg={6}>
              <MainCard>
                <StakePanel type={true} />
              </MainCard>
            </Col>
          </Row>
        </div>
      ) : (
        <div>
          <MainCard>
            <div className="d-flex justify-content-between">
              <div>
                <Typography size={15} style={{ textAlign: "left" }}>
                  Total Staked
                </Typography>
                <Typography
                  size={20}
                  style={{ textAlign: "left" }}
                  className="mb-3"
                >
                  1,250 SDAO LP
                </Typography>
              </div>
              <div>
                <Typography>Withdrawable stake</Typography>
                <Typography>1,250 SDAO LP</Typography>
              </div>
            </div>
          </MainCard>
          <Row>
            <Col lg={6}>
              <MainCard>
                <RewardStakePanel type={true} />
              </MainCard>
            </Col>
            <Col lg={6}>
              <MainCard>
                <Typography size={20}>SDAO earned</Typography>
                <Typography size={24} weight={600} className="mb-3">
                  0.0000
                </Typography>
                <DetailLabel title="Max stake per user" desc="1,500 SDAO LP" />
                <DetailLabel title="APY return" desc="34.74 %" />
                <DetailLabel title="Ends in" desc="1,703,000 blocks" />
              </MainCard>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default TokenFunctionPanel;
