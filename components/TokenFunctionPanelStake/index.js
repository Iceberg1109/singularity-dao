import { useCallback, useEffect, useState } from "react";
import { Row, Card, Col } from "reactstrap";
import styled from "styled-components";
import Typography from "../Typography";
import { DetailLabel } from "./Label";
import RewardStakePanel from "./RewardStakePanel";
import StakeWithdrawPanel from "./StakeWithdrawPanel";
import PropTypes from "prop-types";
import StakeClaimPanel from "./StakeClaimPanel";
import { useUser } from "../UserContext";
import { ethers } from "ethers";
import web3 from "web3";
import { ContractAddress } from "../../assets/constants/addresses";
import SDAOTokenStakingABI from "../../assets/constants/abi/SDAOTokenStaking.json";
import { defaultGasLimit, getGasPrice } from "../../utils/ethereum";

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

// const TokenFunctionTab = styled.div`
//   border: ${({ theme }) => `1px solid ${theme.color.default}`};
//   background-color: ${({ theme, active }) => (active ? theme.color.default : "")};
//   color: ${({ theme, active }) => (active ? theme.color.white : theme.color.default)};
//   cursor: pointer;
//   padding: 4px 10px;
//   font-size: 16px;
//   font-weight: 600;
//   width: 120px;
//   text-align: center;
//   height: 35px;
//   &:first-child {
//     border-top-left-radius: 8px;
//     border-bottom-left-radius: 8px;
//   }

//   &:not(:last-child) {
//     border-right: 0;
//   }

//   &:last-child {
//     border-top-right-radius: 8px;
//     border-bottom-right-radius: 8px;
//   }
// `;

// const TabContainer = styled(Row)`
//   justify-content: center;
//   margin-bottom: 5vh;
// `;

export const PanelTypes = {
  DEPOSIT: "DEPOSIT",
  WITHDRAW: "WITHDRAW",
  CLAIM: "CLAIM",
};

const TokenFunctionPanel = ({ panelType }) => {
  const [pendingRewards, setPendingRewards] = useState(0);
  const { library, account } = useUser();

  useEffect(() => {
    getPendingRewards()
  }, [account])

  const MainPanel = useCallback(() => {
    switch (panelType) {
      case PanelTypes.WITHDRAW:
        return StakeWithdrawPanel;
      case PanelTypes.CLAIM:
        return StakeClaimPanel;
      default:
        return RewardStakePanel;
    }
  }, [panelType])();

  const getPendingRewards = async () => {
    if(!library) return;
    const signer = await library.getSigner(account);
    const stakingContract = new ethers.Contract(ContractAddress.STAKING_REWARD, SDAOTokenStakingABI, signer);
    const gasPrice = await getGasPrice();
    // TODO: Get poolId from route params
    const poolId = 0;
    const rewards = await stakingContract.pendingRewards(poolId.toString(), account, {
      gasLimit: defaultGasLimit,
      gasPrice,
    });
    console.log("rewards", rewards.toString());
    setPendingRewards(rewards.toString());
  };

  return (
    <>
      <MainCard>
        <div className="d-flex justify-content-between">
          <div>
            <Typography size={15} style={{ textAlign: "left" }}>
              Total Staked
            </Typography>
            <Typography size={20} style={{ textAlign: "left" }} className="mb-3">
              {pendingRewards} SDAO LP
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
            <MainPanel />
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
    </>
  );
};

TokenFunctionPanel.propTypes = {
  panelType: PropTypes.oneOf([PanelTypes.DEPOSIT, PanelTypes.WITHDRAW, PanelTypes.CLAIM]),
};

TokenFunctionPanel.defaultProps = {
  panelType: PanelTypes.DEPOSIT,
};

export default TokenFunctionPanel;
