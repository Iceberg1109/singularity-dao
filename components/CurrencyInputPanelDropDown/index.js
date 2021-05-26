import {
  FormGroup,
  Input as DefaultInput,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
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

const Input = styled(DefaultInput)`
  color: ${({ theme }) => `${theme.color.default} !important`};
  font-weight: 600;
`;

const CurrencyInputPanelDropDown = (props) => {
  const [focused, setFocused] = useState();

  const [balance,setBalance] = useState(props.balance);

    const changeprice  = async (e) => {
     // console.log(e.target.value);

      props.onChange(e.target.value);
    }



  return (
    <FormGroup className="my-4 w-100">
      <Typography size={12} weight={300} className="pl-1">
        {props.label}
      </Typography>
      <InputGroup className={classnames("input-group-merge", { focused })}>
        <Input
          placeholder={props.balance}
          onChange={changeprice}
          type="number"
          onFocus={(e) => setFocused(true)}
          onBlur={(e) => setFocused(false)}
          defaultValue={props.balance}
        />
        <UncontrolledDropdown >
        <DropdownToggle
          caret
          color="secondary"
          id="dropdownMenuButton"
          type="button"
           style={{backgroundColor:"#000000",color:'#ffff'}}
        >
            <img
            alt="..."
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png"
            style={{width:'15px'}}
          ></img>
             ETH
        </DropdownToggle>

        <DropdownMenu aria-labelledby="dropdownMenuButton">
      

          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
           <img
            alt="..."
            src="https://cryptologos.cc/logos/tether-usdt-logo.png"
            style={{width:'20px'}}
          ></img>
            USDT
          </DropdownItem>

          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
           <img
            alt="..."
            src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png"
            style={{width:'20px'}}
          ></img>
            USDC
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      </InputGroup>
      <Typography size={14} weight={400} className="pl-1 mt-1">
        Balance: {props.balance}
      </Typography>
    </FormGroup>
  );
};


export default CurrencyInputPanelDropDown;
