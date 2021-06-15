import { useState } from "react";
import styled from "styled-components";
import { Row, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from "reactstrap";
import CurrencyInputPanel from "../CurrencyInputPanelDropDown";
import CurrencyInputPanelSDAOLP from "../CurrencyInputPanelLP";
import CurrencyInputPanelSDAO from "../CurrencyInputPanelSDAO";

import arrowDownIcon from "../../assets/img/icons/arrow-down.png";
import Typography from "../Typography";

import { DefaultButton, GradientButton } from "../Buttons";
import PropTypes from "prop-types";
import { useUser } from "../UserContext";
import web3 from "web3";
import { ChainId, Token, WETH, Trade, TokenAmount, TradeType, Fetcher, Route, Percent } from "@uniswap/sdk";

import { ethers } from "ethers";
import SDAOTokenStakingABI from "../../assets/constants/abi/SDAOTokenStaking.json";
import { abi as DynasetABI } from "../../assets/constants/abi/Dynaset.json";
import settingsIcon from "../../assets/img/icons/settings.svg";
import { defaultGasLimit, getGasPrice } from "../../utils/ethereum";
import { ContractAddress } from "../../assets/constants/addresses";
import StakeSuccessModal from "./StakeSuccessModal";
import { useRouter } from 'next/router';


const FeeBlock = styled(Row)`
  border-top: ${({ theme }) => `1px solid ${theme.color.grayLight}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.color.grayLight}`};
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
  padding: 8px 0;
`;

const StakeWithdrawPanel = ({ type, token, dynasetid }) => {
  // const [fromCurrency, setFromCurrency] = useState("ETH");
  // const [balance, setBalance] = useState(0);
  // const [amounteth, setamountEth] = useState(0);
  // const [toCurrency, setToCurrency] = useState("AGI");
  const [toCurrencyPrice, setToCurrencyPrice] = useState(0);
  const [approved, setApproved] = useState(undefined);

  // const [fee, setFee] = useState(0);
  const [amount, setAmount] = useState("0");
  const [balance, setBalance] = useState("0");
  const { library, account } = useUser();
  const [showStakeSuccessModal, setShowStakeSuccessModal] = useState(false);
  const router = useRouter();

  // const stakeToken = async () => {
  //   if (typeof approved === "undefined") {
  //     return alert("Please Approve before staking");
  //   }
  //   try {
  //     const signer = await library.getSigner(account);

  //     const stakingContract = new ethers.Contract(ContractAddress.STAKING_REWARD, SDAOTokenStakingABI, signer);
  //     const poolId = 0;
  //     const stakeAmount = web3.utils.toWei(toCurrencyPrice.toString());
  //     const gasPrice = await getGasPrice();

  //     const tx = await stakingContract.deposit(poolId, stakeAmount, account, {
  //       gasLimit: defaultGasLimit,
  //       gasPrice,
  //     });

  //     console.log(`Transaction hash: ${tx.hash}`);

  //     const receipt = await tx.wait();

  //     console.log(`Transaction was mined in block ${receipt.blockNumber}`);
  //   } catch (error) {
  //     console.log("error", error);
  //     alert("error: look console for details");
  //   }
  // };

  // const withdraw = async () => {
  //   const signer = await library.getSigner(account);

  //   const stakingContract = new ethers.Contract(ContractAddress.STAKING_REWARD, SDAOTokenStakingABI, signer);

  //   const tx = await stakingContract.getReward({
  //     gasPrice: web3.utils.toWei("60", "gwei"),
  //   });

  //   const receipt = await tx.wait();

  //   console.log(`Transaction was mined in block ${receipt.blockNumber}`);
  // };

  // const getAllowance = async () => {
  //   const signer = await library.getSigner(account);
  //   // const tokenContract = new ethers.Contract(
  //   //   ContractAddress.DYNASET,
  //   //   DynasetABI,
  //   //   signer
  //   // );
  //   const lpToken = new Token(ChainId.ROPSTEN, ContractAddress.LP_TOKEN, 18);
  //   const allowance = await lpToken.allowance(account, ContractAddress.STAKING_REWARD);
  //   console.log("allowance", allowance.toString());
  // };

  // const approveTokens = async () => {
  //   const signer = await library.getSigner(account);
  //   const lpToken = new ethers.Contract(ContractAddress.LP_TOKEN, DynasetABI, signer);
  //   const amountToBeApproved = web3.utils.toWei(toCurrencyPrice.toString());
  //   const gasPrice = await getGasPrice();
  //   const tx = await lpToken.approve(ContractAddress.STAKING_REWARD, amountToBeApproved, {
  //     gasLimit: defaultGasLimit,
  //     gasPrice,
  //   });
  //   console.log(`Transaction hash: ${tx.hash}`);
  //   const receipt = await tx.wait();
  //   console.log(`Approved ${amountToBeApproved} for staking`);
  //   console.log(`Transaction was mined in block ${receipt.blockNumber}`);
  // };

  // const getPoolInfo = async () => {
  //   try {
  //     const signer = await library.getSigner(account);
  //     const stakingContract = new ethers.Contract(ContractAddress.STAKING_REWARD, SDAOTokenStakingABI, signer);
  //     console.log("stakingContract.poolInfo", stakingContract.poolInfo);
  //     const tx = await stakingContract.poolInfo(0);
  //     console.log("tx", tx);
  //   } catch (error) {
  //     console.log("error getpoolInfo", error);
  //     alert("error: look console for details");
  //   }
  // };

  // const getPendingRewards = async () => {
  //   const signer = await library.getSigner(account);

  //   const stakingContract = new ethers.Contract(ContractAddress.STAKING_REWARD, SDAOTokenStakingABI, signer);
  //   const poolId = 0;
  //   const gasPrice = await getGasPrice();
  //   const rewards = await stakingContract.pendingRewards(poolId.toString(), account, {
  //     gasLimit: defaultGasLimit,
  //     gasPrice,
  //   });
  //   console.log("rewards", rewards);
  // };

  const withdrawAndHarvest = async () => {
    const signer = await library.getSigner(account);
    const stakingContract = new ethers.Contract(ContractAddress.STAKING_REWARD, SDAOTokenStakingABI, signer);
    const poolId = 0;
    const withdrawAmount = web3.utils.toWei(amount.toString());
    console.log("withdrawAmount", withdrawAmount);
    const gasPrice = await getGasPrice();

    const tx = await stakingContract.withdrawAndHarvest(poolId, withdrawAmount, account, {
      gasLimit: defaultGasLimit,
      gasPrice,
    });

    console.log(`Transaction hash: ${tx.hash}`);
    const receipt = await tx.wait();
    console.log(`Transaction was mined in block ${receipt.blockNumber}`);
  };

  const handleSubmit = async () => {
    // TODO: Validation
    try {
      await withdrawAndHarvest();
    } catch (error) {
      console.log("error", error);
      alert("error: look console for details");
    }
    // return await getPendingRewards();
    // if (typeof approved === "undefined") {
    //   try {
    //     await approveTokens();
    //     setApproved(toCurrencyPrice);
    //   } catch (error) {
    //     console.log("error", error);
    //     alert("error: look console for details");
    //   }
    // } else {
    //   await stakeToken();
    //   setShowStakeSuccessModal(true);
    // }
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <Typography size={20} style={{ textAlign: "left" }}>
          Start Staking
        </Typography>
      </div>
      <CurrencyInputPanelSDAOLP
        balance={balance}
        toCurrencyPrice={amount}
        onChange={setAmount}
        currency={token}
        label="SDAO LP"
      />
      {/* <CurrencyInputPanelSDAOLP
        balance={toCurrencyPrice}
        onChange={setToCurrencyPrice}
        currency={token}
        label="SDAO"
        hideBalance={true}
      /> */}
      <div className="d-flex justify-content-center">
        <DefaultButton background="white" color="black" borderColor="black">
          Cancel
        </DefaultButton>
        <GradientButton onClick={handleSubmit}>Withdraw</GradientButton>
      </div>
      <StakeSuccessModal
        modalOpen={showStakeSuccessModal}
        setModalOpen={setShowStakeSuccessModal}
        title="Withdraw done successfully!"
        itemsList={[
          { label: "Stake Balance", desc: "960.0000 SDAO LP" },
          { label: "APY (approx.)", desc: "34.74 %" },
        ]}
        resultsList={[{ label: "Withdrawn", desc: "345.2500 SDAO" }]}
        primaryAction={{ label: "Ok", onClick: () => router.push('/') }}
        secondaryAction={{ label: "Withdraw more", onClick: () => setShowStakeSuccessModal(false) }}
      />
    </>
  );
};

StakeWithdrawPanel.propTypes = {
  type: PropTypes.bool,
};

StakeWithdrawPanel.defaultProps = {
  // If true, it means that it is the buy panel. If false, it is the swap panel.
  type: true,
};

export default StakeWithdrawPanel;