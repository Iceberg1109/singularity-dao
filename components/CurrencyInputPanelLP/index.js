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
      <Typography size={14} weight={400} className="pl-1 mt-1">
        Balance: {balance}
      </Typography>
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
