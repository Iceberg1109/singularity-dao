import {
  FormGroup,
  Input as DefaultInput,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
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

const CurrencyInputPanel = (props) => {
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
        <InputGroupAddon addonType="append">
          <InputGroupText>{props.currency}</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <Typography size={14} weight={400} className="pl-1 mt-1">
        Balance: {props.balance}
      </Typography>
    </FormGroup>
  );
};


export default CurrencyInputPanel;
