import { useState } from "react";
import styled from "styled-components";
import {
  Row,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import CurrencyInputPanel from "../../components/CurrencyInputPanelDropDown";
import CurrencyInputPanelSDAO from "../../components/CurrencyInputPanelSDAO";
import arrowDownIcon from "../../assets/img/icons/arrow-down.png";
import Typography from "../Typography";

import { GradientButton } from "../Buttons";
import PropTypes from "prop-types";
import { useUser } from "../../components/UserContext";
import web3 from "web3";
import {
  ChainId,
  Token,
  WETH,
  Trade,
  TokenAmount,
  TradeType,
  Fetcher,
  Route,
  Percent,
} from "@uniswap/sdk";

import { ethers } from "ethers";
import StakingRewardABI from "../../assets/constants/abi/StakingReward.json";
import settingsIcon from "../../assets/img/icons/settings.svg";

const FeeBlock = styled(Row)`
  border-top: ${({ theme }) => `1px solid ${theme.color.grayLight}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.color.grayLight}`};
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
  padding: 8px 0;
`;

const StakePanel = ({ type, token, dynasetid }) => {

  const [fromCurrency, setFromCurrency] = useState("ETH");
  const [balance, setBalance] = useState(0);
  const [amounteth, setamountEth] = useState(0);
  const [toCurrency, setToCurrency] = useState("AGI");
  const [toCurrencyPrice, setToCurrencyPrice] = useState(0);

  const [fee, setFee] = useState(0);
  const [amount, setAmount] = useState();
  const { library, account } = useUser();

  const stake = async () => {

    const signer = await library.getSigner(account);

    const stakingContract = new ethers.Contract(
      "0x1D37CEA62b127B42dd3D45d766289658aEcb6ea0",
      StakingRewardABI,
      signer
    );

    const tx = await stakingContract.stake(
      web3.utils.toWei("1", "gwei"),
      {
        gasPrice: web3.utils.toWei("60", "gwei"),
      }
    );

    console.log(`Transaction hash: ${tx.hash}`);

    const receipt = await tx.wait();

    console.log(`Transaction was mined in block ${receipt.blockNumber}`);
  };


  const withdraw = async () => {

    const signer = await library.getSigner(account);

    const stakingContract = new ethers.Contract(
      "0x1D37CEA62b127B42dd3D45d766289658aEcb6ea0",
      StakingRewardABI,
      signer
    );

    const tx = await stakingContract.getReward(
      {
        gasPrice: web3.utils.toWei("60", "gwei"),
      }
    );

    const receipt = await tx.wait();

    console.log(`Transaction was mined in block ${receipt.blockNumber}`);
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <Typography size={20} style={{ textAlign: "left" }}>
          Stake
        </Typography>
        <img src={settingsIcon} />
      </div>

        <CurrencyInputPanelSDAO
          balance={toCurrencyPrice}
          currency={token}
          label="To"
        />

      <FeeBlock>
        <Typography size={14}>APY:</Typography>
        <Typography size={14}>{fee.toFixed(2)} LP</Typography>
        <Typography size={14}>Current Reward:</Typography>
        <Typography size={14}>{fee.toFixed(2)} SDAO</Typography>
      </FeeBlock>
      <Row>
      <GradientButton onClick={stake}>Stake</GradientButton>
      <GradientButton onClick={withdraw}>Claim</GradientButton>
      <GradientButton onClick={withdraw}>Withdraw</GradientButton>
      </Row>

    </>
  );
};

StakePanel.propTypes = {
  type: PropTypes.bool,
};

StakePanel.defaultProps = {
  // If true, it means that it is the buy panel. If false, it is the swap panel.
  type: true,
};

export default StakePanel;
