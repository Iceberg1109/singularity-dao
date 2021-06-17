import { useState } from "react";
import styled from "styled-components";
import { Row, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from "reactstrap";
import CurrencyInputPanel from "../../components/CurrencyInputPanelDropDown";
import CurrencyInputPanelLP from "../../components/CurrencyInputPanelLP";
// import CurrencyInputPanelSDAO from "../../components/CurrencyInputPanelSDAO";

import arrowDownIcon from "../../assets/img/icons/arrow-down.png";
import Typography from "../Typography";

import { DefaultButton, GradientButton } from "../Buttons";
import PropTypes from "prop-types";
import { useUser } from "../../components/UserContext";
import web3 from "web3";
import { ChainId, Token, WETH, Trade, TokenAmount, TradeType, Fetcher, Route, Percent } from "@uniswap/sdk";

import { ethers } from "ethers";
import SDAOTokenStakingABI from "../../assets/constants/abi/SDAOTokenStaking.json";
import { abi as DynasetABI } from "../../assets/constants/abi/Dynaset.json";
import settingsIcon from "../../assets/img/icons/settings.svg";
import { defaultGasLimit, getGasPrice } from "../../utils/ethereum";
import { ContractAddress } from "../../assets/constants/addresses";
import StakeSuccessModal from "./StakeSuccessModal";
import { useRouter } from "next/router";
import { Currencies } from "../../utils/currencies";

const FeeBlock = styled(Row)`
  border-top: ${({ theme }) => `1px solid ${theme.color.grayLight}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.color.grayLight}`};
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
  padding: 8px 0;
`;

const RewardStakePanel = ({ token, dynasetid }) => {
  const [fromCurrency, setFromCurrency] = useState("ETH");
  const [fromCurrencyPrice, setFromCurrencyPrice] = useState("0");
  const [balance, setBalance] = useState(0);
  const [amounteth, setamountEth] = useState(0);
  const [toCurrency, setToCurrency] = useState("AGI");
  const [toCurrencyPrice, setToCurrencyPrice] = useState(0);
  const [approved, setApproved] = useState(undefined);

  const [fee, setFee] = useState(0);
  const [amount, setAmount] = useState();
  const { library, account } = useUser();
  const [showStakeSuccessModal, setShowStakeSuccessModal] = useState(false);
  const router = useRouter();

  const stakeToken = async () => {
    if (typeof approved === "undefined") {
      return alert("Please Approve before staking");
    }
    try {
      const signer = await library.getSigner(account);

      const stakingContract = new ethers.Contract(ContractAddress.STAKING_REWARD, SDAOTokenStakingABI, signer);
      const poolId = 0;
      const stakeAmount = web3.utils.toWei(toCurrencyPrice.toString());
      const gasPrice = await getGasPrice();

      const tx = await stakingContract.deposit(poolId, stakeAmount, account, {
        gasLimit: defaultGasLimit,
        gasPrice,
      });

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

  //   const stakingContract = new ethers.Contract(ContractAddress.STAKING_REWARD, SDAOTokenStakingABI, signer);

  //   const tx = await stakingContract.getReward({
  //     gasPrice: web3.utils.toWei("60", "gwei"),
  //   });

  //   const receipt = await tx.wait();

  //   console.log(`Transaction was mined in block ${receipt.blockNumber}`);
  // };

  const getAllowance = async () => {
    const signer = await library.getSigner(account);
    // const tokenContract = new ethers.Contract(
    //   ContractAddress.DYNASET,
    //   DynasetABI,
    //   signer
    // );
    const lpToken = new Token(ChainId.ROPSTEN, ContractAddress.LP_TOKEN, 18);
    const allowance = await lpToken.allowance(account, ContractAddress.STAKING_REWARD);
    console.log("allowance", allowance.toString());
  };

  const approveTokens = async () => {
    const signer = await library.getSigner(account);
    const lpToken = new ethers.Contract(ContractAddress.LP_TOKEN, DynasetABI, signer);
    const amountToBeApproved = web3.utils.toWei(toCurrencyPrice.toString());
    const gasPrice = await getGasPrice();
    const tx = await lpToken.approve(ContractAddress.STAKING_REWARD, amountToBeApproved, {
      gasLimit: defaultGasLimit,
      gasPrice,
    });
    console.log(`Transaction hash: ${tx.hash}`);
    const receipt = await tx.wait();
    console.log(`Approved ${amountToBeApproved} for staking`);
    console.log(`Transaction was mined in block ${receipt.blockNumber}`);
  };

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

  const getPendingRewards = async () => {
    const signer = await library.getSigner(account);

    const stakingContract = new ethers.Contract(ContractAddress.STAKING_REWARD, SDAOTokenStakingABI, signer);
    const poolId = 0;
    const gasPrice = await getGasPrice();
    const rewards = await stakingContract.pendingRewards(poolId.toString(), account, {
      gasLimit: defaultGasLimit,
      gasPrice,
    });

    console.log("rewards", rewards);

    return rewards;
  };

  const handleSubmit = async () => {
    // return await getPendingRewards();
    if (typeof approved === "undefined") {
      try {
        await approveTokens();
        setApproved(toCurrencyPrice);
      } catch (error) {
        console.log("error", error);
        alert("error: look console for details");
      }
    } else {
      await stakeToken();
      setShowStakeSuccessModal(true);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <Typography size={20} style={{ textAlign: "left" }}>
          Start Staking
        </Typography>
      </div>
      <CurrencyInputPanelLP
        // balance={toCurrencyPrice}
        amount={fromCurrencyPrice}
        onAmountChange={setFromCurrencyPrice}
        selectedCurrency={Currencies.SDAO_LP.id}
      />
      <CurrencyInputPanelLP
        // balance={toCurrencyPrice}
        amount={toCurrencyPrice}
        onAmountChange={setToCurrencyPrice}
        selectedCurrency={Currencies.SDAO.id}
        hideBalance={true}
      />
      <div className="d-flex justify-content-center">
        <DefaultButton background="white" color="black" borderColor="black">
          Cancel
        </DefaultButton>
        <GradientButton onClick={handleSubmit}>{!approved ? "Confirm Stake" : "Stake"}</GradientButton>
      </div>
      <StakeSuccessModal
        modalOpen={showStakeSuccessModal}
        setModalOpen={setShowStakeSuccessModal}
        title="Token staked successfully!"
        itemsList={[
          { label: "Staked", desc: "960.0000 SDAO LP" },
          { label: "APY (approx.)", desc: "34.74 %" },
        ]}
        resultsList={[{ label: "You get (approx.)", desc: "345.2500 SDAO" }]}
        primaryAction={{ label: "Ok", onClick: () => router.push("/") }}
        secondaryAction={{ label: "Withdraw more", onClick: () => setShowStakeSuccessModal(false) }}
      />
    </>
  );
};

RewardStakePanel.propTypes = {
  type: PropTypes.bool,
};

RewardStakePanel.defaultProps = {
  // If true, it means that it is the buy panel. If false, it is the swap panel.
  type: true,
};

export default RewardStakePanel;
