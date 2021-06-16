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
  ButtonGroup,
  ButtonDropdown,
} from "reactstrap";
import classnames from "classnames";
import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Typography from "../Typography";
import arrowDownIcon from "../../assets/img/icons/arrow-down-small.svg";
import { Currencies, getBalance, getCurrencyById } from "../../utils/currencies";
import { useUser } from "../UserContext";

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

const CurrencyInputPanel = ({ onAmountChange, label, amount, selectedCurrency, setSelectedCurrency }) => {
  const [dropdownOpen, setOpen] = useState(false);
  // const [selectedCurrency, setSelectedCurrency] = useState(Currencies.ETH.id);
  const [balance, setBalance] = useState("0");
  const { library, account, network, chainId } = useUser();

  // useEffect(() => {
  //   setSelectedCurrency(defaultCurrency);
  // }, [defaultCurrency]);

  useEffect(() => updateBalance(selectedCurrency), [account, selectedCurrency]);

  const toggle = () => setOpen(!dropdownOpen);

  const getCurrency = useCallback(() => getCurrencyById(selectedCurrency), [selectedCurrency]);

  const getIcon = useCallback(() => {
    const currency = getCurrency();
    return currency ? currency.icon : "'";
  }, [selectedCurrency]);

  const getName = useCallback(() => {
    const currency = getCurrency();
    return currency ? currency.name : "'";
  }, [selectedCurrency]);

  const changeprice = async (e) => {
    onAmountChange(e.target.value);
  };

  const updateBalance = async (currencyId) => {
    try {
      console.log("update bal 1", currencyId);
      if (!library) return;
      console.log("update bal 2", currencyId);
      const signer = await library.getSigner(account);
      const balance = await getBalance(currencyId, account, { chainId, network, signer });
      console.log("update bal 3", balance);

      setBalance(balance);
    } catch (error) {
      console.log("update bal 4", error);
    }
  };

  const handleCurrencyChange = (currencyId) => {
    setSelectedCurrency(currencyId);
    updateBalance(currencyId);
  };

  return (
    <FormGroup className="my-4 w-100">
      <Typography size={12} weight={300} className="pl-1">
        {label}
      </Typography>
      <InputGroup>
        <Input placeholder={balance} onChange={changeprice} value={amount} type="number" />
        <CurrencyContainer>
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle type="button" color="secondary" caret>
              <img alt="..." src={getIcon()} style={{ width: "15px" }} className="mr-2" />
              {getName()}
            </DropdownToggle>
            <DropdownMenu>
              {Object.values(Currencies).map((value) => (
                <DropdownItem onClick={() => handleCurrencyChange(value.id)}>{value.name}</DropdownItem>
              ))}
            </DropdownMenu>
          </ButtonDropdown>
          {/* <CurrencyItem>
            <img alt="..." src={svgLogoSrc[currency]} style={{ width: "15px" }} className="mr-2" />
            <Typography color="text1" size={15} weight={600}>
              {currency}
            </Typography>
            <img src={arrowDownIcon} className="ml-2" />
          </CurrencyItem> */}
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
          ~ ${balance} {getName() == Currencies.SDAO.name ? "(0.5% slippage)" : ""}
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

CurrencyInputPanel.defaultProps = {
  selectedCurrency: Currencies.ETH.id,
  setSelectedCurrency: () => console.log("Currency change is not handled"),
};

export default CurrencyInputPanel;
