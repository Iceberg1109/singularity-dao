import {
  FormGroup,
  Input as DefaultInput,
  InputGroupAddon,
  InputGroupText,
  InputGroup as DefaultInputGroup,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import classnames from "classnames";
import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Typography from "../Typography";
import arrowDownIcon from "../../assets/img/icons/arrow-down-small.svg";

const Input = styled(DefaultInput)`
  color: ${({ theme }) => `${theme.color.default} !important`};
  font-weight: 600;
  background: transparent !important;
  box-shadow: none !important;
  border: none !important;
  border: none;
  padding: 28px 14px;
  border-radius: 10px;
`;

const CurrencyContainer = styled.div`
  position: absolute;
  right: 12px;
  top: 9px;
`;

const CurrencyItem = styled.div`
  display: flex;
  background: ${({ theme }) => theme.color.bg10};
  color: ${({ theme }) => theme.color.text10};
  padding: 7px 21px;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background: #eeeeee;
  }
`;

const InputGroup = styled.div`
  background: ${({ theme }) => `${theme.color.violet0} !important`};
  position: relative;
  border-radius: 10px;
`;

const CurrencyInputPanel = (props) => {
  const [focused, setFocused] = useState();

  const [balance, setBalance] = useState(props.balance);

  const changeprice = async (e) => {
    // console.log(e.target.value);

    props.onChange(e.target.value);
  };

  return (
    <FormGroup className="my-4 w-100">
      <Typography size={12} weight={300} className="pl-1">
        {props.label}
      </Typography>
      <InputGroup>
        <Input
          placeholder={props.balance}
          onChange={changeprice}
          onFocus={(e) => setFocused(true)}
          onBlur={(e) => setFocused(false)}
          defaultValue={props.balance}
        />
        <CurrencyContainer>
          <CurrencyItem>
            <img
              alt="..."
              src={
                props.label == "From"
                  ? "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png"
                  : "https://www.singularitydao.ai/file/2021/05/SINGDAO-LOGO-1-768x768.jpg"
              }
              style={{ width: "15px" }}
              className="mr-2"
            />
            <Typography color="text1" size={15} weight={600}>
              {props.label == "From" ? "ETH" : "SDAO"}
            </Typography>
            <img src={arrowDownIcon} className="ml-2" />
          </CurrencyItem>
          {/* <UncontrolledDropdown>
            <DropdownToggle
              caret
              color="secondary"
              id="dropdownMenuButton"
              type="button"
            >
              <img
                alt="..."
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png"
                style={{ width: "15px" }}
              ></img>
              ETH
            </DropdownToggle>

            <DropdownMenu aria-labelledby="dropdownMenuButton">
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                <img
                  alt="..."
                  src="https://cryptologos.cc/logos/tether-usdt-logo.png"
                  style={{ width: "20px" }}
                ></img>
                USDT
              </DropdownItem>

              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                <img
                  alt="..."
                  src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png"
                  style={{ width: "20px" }}
                ></img>
                USDC
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
        </CurrencyContainer>
      </InputGroup>
      <div className="d-flex justify-content-between">
        <Typography size={16} weight={400} color="text5">
          ~ ${props.balance} {props.label == "To" ? "(0.5% slippage)" : ""}
        </Typography>
        <div className="d-flex">
          <Typography size={16} color="text1">
            Balance: {props.balance.toFixed(2)}
          </Typography>
          <Typography size={16} color="link1" weight={600} className="ml-2">
            MAX
          </Typography>
        </div>
      </div>
    </FormGroup>
  );
};

export default CurrencyInputPanel;
