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
import { defaultGasLimit, getGasPrice } from "../../utils/gasPrice";
import { ContractAddress } from "../../assets/constants/addresses";
import StakeSuccessModal from "./StakeSuccessModal";
import { useRouter } from "next/router";

const FeeBlock = styled(Row)`
  border-top: ${({ theme }) => `1px solid ${theme.color.grayLight}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.color.grayLight}`};
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
  padding: 8px 0;
`;

const StakeWithdrawPanel = ({ token }) => {
  const [toCurrencyPrice, setToCurrencyPrice] = useState(0);
  const [approved, setApproved] = useState(undefined);

  const [amount, setAmount] = useState("0");
  const [balance, setBalance] = useState("0");
  const { library, account } = useUser();
  const [showStakeSuccessModal, setShowStakeSuccessModal] = useState(false);
  const router = useRouter();

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
    showStakeSuccessModal(true);
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
      <div className="d-flex justify-content-center">
        <DefaultButton background="white" color="black" borderColor="black">
          Cancel
        </DefaultButton>
        <GradientButton onClick={handleSubmit}>Withdraw</GradientButton>
      </div>
      <StakeSuccessModal
        modalOpen={showStakeSuccessModal}
        setModalOpen={setShowStakeSuccessModal}
        title="Claim done successfully!"
        itemsList={[
          { label: "Stake Balance", desc: "960.0000 SDAO LP" },
          { label: "APY (approx.)", desc: "34.74 %" },
        ]}
        resultsList={[{ label: "Withdrawn", desc: "345.2500 SDAO" }]}
        primaryAction={{ label: "Ok", onClick: () => router.push("/") }}
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
