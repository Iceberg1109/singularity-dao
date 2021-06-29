import { useCallback, useEffect, useState } from "react";
import { Card, Col, Progress, Row } from "reactstrap";
import styled from "styled-components";
import { OutlinedButton } from "../Buttons";
import Typography from "../Typography";
import { useRouter } from "next/router";
import {DetailLabel} from "../TokenFunctionPanelStake/Label";
import { ContractAddress } from "../../assets/constants/addresses";
import SDAOTokenStakingABI from "../../assets/constants/abi/SDAOTokenStaking.json";
import { useUser } from "../UserContext";
import useInterval from "../../utils/hooks/useInterval";
import { unitBlockTime } from "../../utils/ethereum";
import { ethers } from "ethers";
import Web3 from "web3";

const CustomProgress = styled(Progress)`
  .progress-bar {
    background-color: ${({ theme }) => `${theme.color.interactive3} !important`};
  }
  height: 8px !important;
  margin-bottom: 10px !important;
`;

const ForgeBasket = ({ data, title,apy,poolid,name }) => {
  const router = useRouter();
  const [pendingRewards, setPendingRewards] = useState(0);
   const [userInfoAmount, setUserInfoAmount] = useState(0);
  const { library, account } = useUser();
  

  const routeLinkwithdraw = poolid ? `farms/withdraw/${poolid}` : "#";
  const routeLinkdeposit = poolid ? `farms/deposit/${poolid}` : "#";
  const routeLinkclaim = poolid ? `farms/claim/${poolid}` : "#";
 
   useInterval(() => getUserStakeDetails(), unitBlockTime, [account]);
  
   const getUserStakeDetails = () => {
    getPendingRewards();
    getStateUserInfo();
  };

    const getPendingRewards = async () => {
    try {
      if (!library) return;
      const signer = await library.getSigner(account);
      const stakingContract = new ethers.Contract(ContractAddress.FARMING_REWARD, SDAOTokenStakingABI, signer);
      const poolId = 0;

      const rewards = await stakingContract.callStatic.pendingRewards(poolid, account);
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
      const stakingContract = new ethers.Contract(ContractAddress.FARMING_REWARD, SDAOTokenStakingABI, signer);
      const userInfo = await stakingContract.callStatic.userInfo(poolid, account);
      setUserInfoAmount(Web3.utils.fromWei(userInfo.amount.toString()));
      console.log("userInfo", userInfo.amount.toString());
    } catch (error) {
      console.log("userInfo erorrrrrrrrrrrrrrrr", error);
    }
  };


  return (
    <Card className="p-4 forge-card" style={{borderRadius:8}}>
      <Row>
        <Col className="col-auto">
          <img src="https://www.singularitydao.ai/file/2021/04/singularitydao-image.png" width={40} height={40} />
        </Col>
        <Col>
          <Typography color="text1" size={24} weight={600}>
            {title}
          </Typography>
        </Col>
      </Row>
      <DetailLabel title="APY" desc={apy} />
      <DetailLabel title="Your stake" desc={`${userInfoAmount} SDAO`} />
      <div className="text-align-center mt-3">
        <OutlinedButton color="interactive2" onClick={() => router.push({ pathname: routeLinkwithdraw })}>
          Withdraw
        </OutlinedButton>
        <OutlinedButton color="interactive2" onClick={() => router.push({ pathname: routeLinkdeposit })}>
          Farm
        </OutlinedButton>
      </div>
      <hr />
      <DetailLabel title="SDAO earned" desc={`${pendingRewards} SDAO`} />
      <div className="text-align-center mt-3">
        <OutlinedButton color="interactive2" onClick={() => router.push({ pathname: routeLinkclaim })}>
          Harvest
        </OutlinedButton>
      </div>
      {/* </Card> */}
    </Card>
  );
};

export default ForgeBasket;
