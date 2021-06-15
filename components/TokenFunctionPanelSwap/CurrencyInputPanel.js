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

const svgLogoSrc = {
  ETH: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png",
  SDAO: "https://www.singularitydao.ai/file/2021/05/SINGDAO-LOGO-1-768x768.jpg",
};
const CurrencyInputPanel = ({ balance, onChange, label, value, currency }) => {
  // const [focused, setFocused] = useState();

  // const [balance, setBalance] = useState(props.balance);

  const changeprice = async (e) => {
    // console.log(e.target.value);

    onChange(e.target.value);
  };

  return (
    <FormGroup className="my-4 w-100">
      <Typography size={12} weight={300} className="pl-1">
        {label}
      </Typography>
      <InputGroup>
        <Input
          placeholder={balance}
          onChange={changeprice}
          // onFocus={(e) => setFocused(true)}
          // onBlur={(e) => setFocused(false)}
          // defaultValue={balance}
          value={value}
        />
        <CurrencyContainer>
          <CurrencyItem>
            <img alt="..." src={svgLogoSrc[currency]} style={{ width: "15px" }} className="mr-2" />
            <Typography color="text1" size={15} weight={600}>
              {/* {label == "From" ? "ETH" : "SDAO"} */}
              {currency}
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
          ~ ${balance} {currency == "SDAO" ? "(0.5% slippage)" : ""}
        </Typography>
        <div className="d-flex">
          <Typography size={16} color="text1">
            Balance: {balance}
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
