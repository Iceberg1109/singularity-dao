import {
  FormGroup,
  Input as DefaultInput,
  InputGroup as DefaultInputGroup,
  DropdownToggle as DefaultDropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import classnames from "classnames";
import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Typography from "../Typography";
import { LinkButton } from "../Buttons";
import { useUser } from "components/UserContext";
import { getBalance, getCurrencyById } from "../../utils/currencies";
import { toast } from "react-toastify";
import { useTokenDetails } from "../../utils/hooks/useTokenDetails";
import web3 from "web3";
import BigNumber from "bignumber.js";
import { toFraction } from "../../utils/balance";
import useInterval from "../../utils/hooks/useInterval";
import { unitBlockTime } from "../../utils/ethereum";

const Input = styled(DefaultInput)`
  color: ${({ theme }) => `${theme.color.default} !important`};
  font-weight: 600;
  background: transparent;
  padding: 24px 28px 30px;
  border-radius: 8px;
`;

const InputGroup = styled(DefaultInputGroup)`
  background: ${({ theme }) => theme.color.violet0};
  position: relative;
  border-radius: 10px;
`;

const DropdownToggle = styled(DefaultDropdownToggle)`
  background: white !important;
  color: black !important;
  border-radius: 8px;
`;

const CurrencyContainer = styled.div`
  position: absolute;
  right: 12px;
  top: 9px;
`;

const CurrencyInputPanelLP = ({ amount, onAmountChange, selectedCurrency, disabled, token }) => {
  const [focused, setFocused] = useState();
  const { library, account, network, chainId } = useUser();
  const [balance, setBalance] = useState("0");
  const { loading: tokenLoading, data: tokenData, error: tokenError } = useTokenDetails(token, account, library);
  console.log("tokenData", tokenData);
  console.log("tokenError", tokenError);
  // useEffect(() => updateBalance(selectedCurrency), );
  useInterval(()=>updateBalance(selectedCurrency), unitBlockTime, [account, selectedCurrency, tokenLoading])

  const getCurrency = useCallback(() => getCurrencyById(selectedCurrency), [selectedCurrency]);

  const getName = useCallback(() => {
    const currency = getCurrency();
    return currency ? currency.name : "'";
  }, [selectedCurrency]);

  const changeprice = async (event) => {
    let { value } = event.target;
    value = value && value > 0 ? value : 0;
    onAmountChange(value);
  };

  const updateBalance = async (currencyId) => {
    try {
      if (!token) {
        // DEPRECATED: Fallback block. Will be removed in future
        if (!library) return;
        const signer = await library.getSigner(account);
        const balance = await getBalance(currencyId, account, { chainId, network, signer });
        setBalance(balance);
        return;
      }
      if (tokenData) {
        const balance = await tokenData.getBalance();
        const fraction = toFraction(balance.toString(), tokenData.decimals);
        setBalance(fraction);
      }
    } catch (error) {
      toast("unable to fetch the latest balance", { type: "error" });
      console.log("unable to fetch the latest balance error", error);
    }
  };

  const handleMaxClick = () => {
    if (!balance) return;
    onAmountChange(balance);
  };

  const tokenSymbol = () => {
    if (!token) {
      // DEPRECATED: Fallback block. Will be removed in future
      return getName();
    }
    return tokenData?.symbol;
  };

  return (
    <FormGroup className="my-4 w-100">
      <Typography size={12} weight={300} className="pl-1">
        {tokenSymbol()}
      </Typography>
      <InputGroup className={classnames("input-group-merge", { focused })}>
        <Input
          placeholder={balance}
          onChange={changeprice}
          type="text"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={amount}
          disabled={disabled}
        />
        <CurrencyContainer>
          <UncontrolledDropdown>
            <DropdownToggle
              caret
              color="secondary"
              id="dropdownMenuButton"
              type="button"
              style={{ backgroundColor: "#000000", color: "#ffff" }}
            >
              {/* <img
              alt="..."
              src="https://www.singularitydao.ai/file/2021/05/SINGDAO-LOGO-1-768x768.jpg"
              style={{ width: "15px" }}
            ></img> */}
              {tokenSymbol()}
            </DropdownToggle>
          </UncontrolledDropdown>
        </CurrencyContainer>
      </InputGroup>
      <div className="d-flex justify-content-between mt-1">
        <Typography size={14} weight={400} color="text2" className="pl-1">
          ~ $ value
        </Typography>
        <div className="d-flex">
          <Typography size={14} weight={400} className="pl-1">
            Balance: {balance}
          </Typography>
          <LinkButton className="ml-2 " color="link" onClick={handleMaxClick}>
            MAX
          </LinkButton>
        </div>
      </div>
    </FormGroup>
  );
};

CurrencyInputPanelLP.propTypes = {
  label: PropTypes.string,
  balance: PropTypes.string,
  toCurrencyPrice: PropTypes.number,
  onChange: PropTypes.func,
};

export default CurrencyInputPanelLP;
