import {
  FormGroup,
  Input as DefaultInput,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Button,
} from "reactstrap";
import classnames from "classnames";
import {  useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Typography from "../Typography";
import tokensimg from "./tokens.json"
import {useUser} from '../../components/UserContext';
import {ethers} from 'ethers';
import web3 from 'web3';
import { defaultApprovalSDAO, getGasPrice } from "../../utils/ethereum";

const Input = styled(DefaultInput)`
  color: ${({ theme }) => `${theme.color.default} !important`};
  font-weight: 600;
`;

const tokenMetadata = {
  "BAT": {
    name: "Basic Attention Token",
    image: "https://s2.coinmarketcap.com/static/img/coins/200x200/1697.png"
  }
}



let minABI = [
  // balanceOf
  {
    "constant":true,
    "inputs":[{"name":"_owner","type":"address"}],
    "name":"balanceOf",
    "outputs":[{"name":"balance","type":"uint256"}],
    "type":"function"
  },
  // decimals
  {
    "constant":true,
    "inputs":[],
    "name":"decimals",
    "outputs":[{"name":"","type":"uint8"}],
    "type":"function"
  }, 
  {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
];


const TokenInputPanel = ({ currency,ratio,address }) => {
  const [focused, setFocused] = useState();
  const [balance, setBalance] = useState(0);
  const [tokenimg, setTokenImg] = useState();

  const {library, account} = useUser();


  useEffect(() => {

    fetchData();
  }, );


    const approve = async () => {


    const signer = await library.getSigner(account);

    const Token = new ethers.Contract(
      address,
      minABI,
      signer
    );
    const gasPrice = await getGasPrice();

    const approve = await Token.approve("0x48453f6b8e59fb7ec3d6bf0d1f594c12b1606ee2",defaultApprovalSDAO,{gasLimit: 85000, gasPrice});


     const receipt = await approve.wait();
      
      console.log(`Transaction was mined in block ${receipt.blockNumber}`);
  

    }


    const fetchData = async () => {
     
        var arrFound = tokensimg.filter(function(coin) {
          return coin.name == currency;
        });

        console.log(arrFound[0]);

        console.log(arrFound[0].image)

        setTokenImg(arrFound[0].image);

    };


  console.log(currency)

  return (
    <FormGroup className="my-2 w-100 d-flex justify-content-between align-items-center">
      <div className="custom-control custom-checkbox d-flex align-items-center">
        {/* <input
          className="custom-control-input"
          type="checkbox"
          id="custom-checkbox"
        />
        <label
          className="custom-control-label"
          htmlFor="custom-checkbox"
        ></label> */}

       {tokenimg && <img
          src={tokenimg}
          className="mr-2"
          height={30}
        />}
        <Typography className="mr-3">{currency}</Typography>
      </div>
      <div>
        <InputGroup className={classnames("input-group-merge", { focused })}>
          <Input
            placeholder="Balance"
            type="number"
            disabled={true}
            onFocus={(e) => setFocused(true)}
            onBlur={(e) => setFocused(false)}
            defaultValue={ratio}
          />
        </InputGroup>
      </div>
    </FormGroup>
  );
};

TokenInputPanel.propTypes = {
  currency: PropTypes.string,
};

export default TokenInputPanel;
