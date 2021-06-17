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
import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Typography from "../Typography";
import { LinkButton } from "../Buttons";

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

const CurrencyInputPanelSDAO = ({ label, balance, toCurrencyPrice, onChange }) => {
  const [focused, setFocused] = useState();
<<<<<<< HEAD
  const [balance, setBalance] = useState("0");
  const { library, account, network, chainId } = useUser();
  
  useEffect(() => updateBalance(selectedCurrency), [account, selectedCurrency]);

  const getCurrency = useCallback(() => getCurrencyById(selectedCurrency), [selectedCurrency]);

  const getName = useCallback(() => {
    const currency = getCurrency();
    return currency ? currency.name : "'";
  }, [selectedCurrency]);
=======
>>>>>>> parent of bccd9d4 (LP input panel)

  const changeprice = async (e) => {
    let { value } = e.target;
    value = value && value > 0 ? value : 0;
    onChange(value);
  };

  return (
    <FormGroup className="my-4 w-100">
      <Typography size={12} weight={300} className="pl-1">
        {label}
      </Typography>
      <InputGroup className={classnames("input-group-merge", { focused })}>
        <Input
          placeholder={balance}
          onChange={changeprice}
          type="number"
          onFocus={(e) => setFocused(true)}
          onBlur={(e) => setFocused(false)}
          value={toCurrencyPrice}
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
            {label}
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
          <LinkButton className="ml-2 " color="link">
            MAX
          </LinkButton>
        </div>
      </div>
    </FormGroup>
  );
};

CurrencyInputPanelSDAO.propTypes = {
  label: PropTypes.string,
  balance: PropTypes.string,
  toCurrencyPrice: PropTypes.number,
  onChange: PropTypes.func,
};

export default CurrencyInputPanelSDAO;
