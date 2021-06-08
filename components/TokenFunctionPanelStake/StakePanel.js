import { useState } from "react";
import styled from "styled-components";
import { Row, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from "reactstrap";
import CurrencyInputPanel from "../../components/CurrencyInputPanelDropDown";
import CurrencyInputPanelSDAO from "../../components/CurrencyInputPanelLP";
import arrowDownIcon from "../../assets/img/icons/arrow-down.png";
import Typography from "../Typography";

import { GradientButton } from "../Buttons";
import PropTypes from "prop-types";
import { useUser } from "../../components/UserContext";
import web3 from "web3";
import { ChainId, Token, WETH, Trade, TokenAmount, TradeType, Fetcher, Route, Percent } from "@uniswap/sdk";

import { ethers } from "ethers";
import StakingRewardABI from "../../assets/constants/abi/StakingReward.json";
import { abi as DynasetABI } from "../../assets/constants/abi/Dynaset.json";
import settingsIcon from "../../assets/img/icons/settings.svg";
import { defaultGasLimit, getGasPrice } from "../../utils/gasPrice";
import { ContractAddress } from "../../assets/constants/addresses";

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
  const [approved, setApproved] = useState(undefined);

  const [fee, setFee] = useState(0);
  const [amount, setAmount] = useState();
  const { library, account } = useUser();

  const stakeToken = async () => {
    if (typeof approved === "undefined") {
      return alert("Please Approve before staking");
    }
    try {
      const signer = await library.getSigner(account);

      const stakingContract = new ethers.Contract(ContractAddress.STAKING_REWARD, StakingRewardABI, signer);

      const stakeAmount = web3.utils.toWei(toCurrencyPrice.toString());
      const gasPrice = await getGasPrice();

      const tx = await stakingContract.stake(stakeAmount, { gasLimit: defaultGasLimit, gasPrice });

      console.log(`Transaction hash: ${tx.hash}`);

      const receipt = await tx.wait();

      console.log(`Transaction was mined in block ${receipt.blockNumber}`);
    } catch (error) {
      console.log("error", error);
      alert("error: look console for details");
    }
  };

  // const withdraw = async () => {
  //   const signer = await library.getSigner(account);

  //   const stakingContract = new ethers.Contract(ContractAddress.STAKING_REWARD, StakingRewardABI, signer);

  //   const tx = await stakingContract.getReward({
  //     gasPrice: web3.utils.toWei("60", "gwei"),
  //   });

  //   const receipt = await tx.wait();

  //   console.log(`Transaction was mined in block ${receipt.blockNumber}`);
  // };

  const approveTokens = async () => {
    const signer = await library.getSigner(account);
    const tokenContract = new ethers.Contract(ContractAddress.DYNASET, DynasetABI, signer);
    const amountToBeApproved = web3.utils.toWei(toCurrencyPrice.toString());
    const gasPrice = await getGasPrice();
    const tx = await tokenContract.approve(ContractAddress.STAKING_REWARD, amountToBeApproved, {
      gasLimit: defaultGasLimit,
      gasPrice,
    });
    console.log(`Transaction hash: ${tx.hash}`);
    const receipt = await tx.wait();
    console.log(`Approved ${amountToBeApproved} for staking`)
    console.log(`Transaction was mined in block ${receipt.blockNumber}`);
  };

  const handleSubmit = async () => {
    if (typeof approved === "undefined") {
      try {
        await approveTokens();
        setApproved(toCurrencyPrice);
      } catch (error) {}
    } else {
      await stakeToken();
    }
  };

  return (
    <>
      <>
        <div className="d-flex justify-content-between">
          <Typography size={20} style={{ textAlign: "left" }}>
            Start Staking
          </Typography>
        </div>

        <CurrencyInputPanelSDAO
          balance={toCurrencyPrice}
          currency={token}
          label="To"
        />

        <div className="text-align-center">
          <GradientButton onClick={handleSubmit}>Stake</GradientButton>
        </div>
      </>
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
