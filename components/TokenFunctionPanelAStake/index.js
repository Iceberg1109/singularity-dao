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
import { ContractAddress } from "../../assets/constants/addresses";
import SDAOTokenStakingABI from "../../assets/constants/abi/SDAOTokenStaking.json";
import { unitBlockTime } from "../../utils/ethereum";
import Web3 from "web3";
import useInterval from "../../utils/hooks/useInterval";

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

export const PanelTypes = {
  DEPOSIT: "DEPOSIT",
  WITHDRAW: "WITHDRAW",
  CLAIM: "CLAIM",
};

const TokenFunctionPanel = ({ panelType,apy }) => {
  const poolId = 0;
  const [pendingRewards, setPendingRewards] = useState(0);
  const [userInfoAmount, setUserInfoAmount] = useState(0);
  const { library, account } = useUser();

  useInterval(() => getUserStakeDetails(), unitBlockTime, [account]);

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

  const getUserStakeDetails = () => {
    getPendingRewards();
    getStateUserInfo();
  };

  const getPendingRewards = async () => {
    try {
      if (!library) return;
      const signer = await library.getSigner(account);
      const stakingContract = new ethers.Contract(ContractAddress.STAKING_REWARD, SDAOTokenStakingABI, signer);
      const poolId = 0;

      const rewards = await stakingContract.callStatic.pendingRewards(poolId.toString(), account);
      console.log("rewards Withdraw ", rewards.toString());
      setPendingRewards(Web3.utils.fromWei(rewards.toString()));
      return rewards;
    } catch (error) {
      console.log("erorrrrrrrrrrrrrrrr", error);
    }
  };

  const getStateUserInfo = async () => {
    try {
      if (!library) return;
      const signer = await library.getSigner(account);
      const stakingContract = new ethers.Contract(ContractAddress.STAKING_REWARD, SDAOTokenStakingABI, signer);
      const userInfo = await stakingContract.callStatic.userInfo(poolId.toString(), account);
      setUserInfoAmount(Web3.utils.fromWei(userInfo.amount.toString()));
      console.log("userInfo", userInfo.amount.toString());
    } catch (error) {
      console.log("userInfo erorrrrrrrrrrrrrrrr", error);
    }
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
              {userInfoAmount} SDAO
            </Typography>
          </div>
          {/* <div>
            <Typography>Withdrawable stake</Typography>
            <Typography>{userInfoAmount} SDAO</Typography>
          </div> */}
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
              {pendingRewards} SDAO
            </Typography>
            <DetailLabel title="APY return" desc="13 %" />
            <DetailLabel title="Ends in" desc="60 days" />
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
