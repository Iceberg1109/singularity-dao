import { useState } from "react";
import { Row, Card } from "reactstrap";
import styled from "styled-components";
import BuyPanel from "./MintPanel";
import MintPanel from "./MintPanel";
import ForgePanel from "./BuyPanel";
import Minteth from "./Minteth"
import Typography from "../Typography";

const MainCard = styled(Card)`
  align-items: center;
  padding: 0px;
  color: #fff;
  background-clip: padding-box;
  border: solid 2px transparent;
  border-radius: 1em;
  height: 100%;
  margin: 0;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: -2px;
    border-radius: inherit;
    background: ${({ theme }) => theme.color.gradient2};
  }
`;

const TokenFunctionTab = styled.div`
  border: ${({ theme }) => `1px solid ${theme.color.default}`};
  background-color: ${({ theme, active }) =>
    active ? theme.color.default : ""};
  color: ${({ theme, active }) =>
    active ? theme.color.white : theme.color.default};
  cursor: pointer;
  padding: 4px 10px;
  font-size: 14px;
  font-weight: 600;

  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &:not(:last-child) {
    border-right: 0;
  }

  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

const TokenFunctionPanel = ({ dynasetid, symbol,pooltoken}) => {
  const [activeTab, setActiveTab] = useState(0);

  
  return (
    <div>
    <Row className="justify-content-center" >
     <Typography style={{marginTop:'10px'}}>With : </Typography>
     </Row>
      <Row className="justify-content-center" style={{marginTop:'10px'}}>
        <TokenFunctionTab
          active={activeTab === 0}
          onClick={() => setActiveTab(0)}
        >
          Eth
        </TokenFunctionTab>
        <TokenFunctionTab
          active={activeTab === 1}
          onClick={() => setActiveTab(1)}
        >
          Underlying
        </TokenFunctionTab>
      </Row>
      <Row className="justify-content-center">
      {activeTab === 0 && <ForgePanel type={true} dynasetid ={dynasetid} ptokens={pooltoken} token={symbol}/>}
      {activeTab === 1 && <BuyPanel type={true} dynasetid ={dynasetid} ptokens={pooltoken} token={symbol} />}
    </Row>
    </div>
  );
};

//      {activeTab === 1 && <Minteth type={true} dynasetid ={dynasetid} ptokens={pooltoken} token={symbol}/>}

export default TokenFunctionPanel;
