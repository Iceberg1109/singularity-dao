import {
  FormGroup,
  Input as DefaultInput,
  InputGroupAddon,
  InputGroupText,
  InputGroup as DefaultInputGroup,
  DropdownToggle as DefaultDropdownToggle,
  DropdownMenu,
  DropdownItem,
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
import { toast } from 'react-nextjs-toast'

const Input = styled(DefaultInput)`
  color: ${({ theme }) => `${theme.color.default} !important`};
  font-weight: 600;
  background: transparent;
  border-radius: 8px;
`;

const InputGroup = styled(DefaultInputGroup)`
  background: ${({ theme }) => theme.color.violet0};
  border-radius: 8px;
`;

const DropdownToggle = styled(DefaultDropdownToggle)`
  background: white !important;
  color: black !important;
  border-radius: 8px;
`;

const CurrencyInputPanelLP = ({ amount, onAmountChange, selectedCurrency, disabled }) => {
  const [focused, setFocused] = useState();
  const { library, account, network, chainId } = useUser();
  const [balance, setBalance] = useState("0");

  useEffect(() => updateBalance(selectedCurrency), [account, selectedCurrency]);

  const getCurrency = useCallback(() => getCurrencyById(selectedCurrency), [selectedCurrency]);

  const getName = useCallback(() => {
    const currency = getCurrency();
    return currency ? currency.name : "'";
  }, [selectedCurrency]);

  const changeprice = async (e) => {
    let { value } = e.target;
    value = value && value > 0 ? value : 0;
    onAmountChange(value);
  };

  const updateBalance = async (currencyId) => {
    try {
      if (!library) return;
      const signer = await library.getSigner(account);
      const balance = await getBalance(currencyId, account, { chainId, network, signer });
      setBalance(balance);
    } catch (error) {
      toast.notify("unable to fetch the latest balance", { type: "error" });
      console.log("error", error);
    }
  };

  const handleMaxClick = () => {
    if (!balance) return;
    onAmountChange(balance);
  };

  return (
    <FormGroup className="my-4 w-100">
      <Typography size={12} weight={300} className="pl-1">
        {getName()}
      </Typography>
      <InputGroup className={classnames("input-group-merge", { focused })}>
        <Input
          placeholder={balance}
          onChange={changeprice}
          type="text"
          onFocus={(e) => setFocused(true)}
          onBlur={(e) => setFocused(false)}
          value={amount}
          disabled={disabled}
        />
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
            {getName()}
          </DropdownToggle>
        </UncontrolledDropdown>
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
