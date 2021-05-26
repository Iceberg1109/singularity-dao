import { useState } from "react";
import { Row, Card } from "reactstrap";
import styled from "styled-components";
import BuyPanel from "./BuyPanel";
import MintPanel from "components/MintOptions";
import BurnPanel from "./BurnPanel";
import SwapPanel from "./SwapPanel";

const MainCard = styled(Card)`
  align-items: center;
  padding: 20px;
  color: #fff;
  background-color:#212121;
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

const TokenFunctionPanel = ({ indexpool ,pooltokens}) => {
  const [activeTab, setActiveTab] = useState(0);

  
  return (
    <MainCard>
      <Row className="justify-content-center">
        <TokenFunctionTab
          active={activeTab === 0}
          onClick={() => setActiveTab(0)}
        >
          Buy
        </TokenFunctionTab>
        <TokenFunctionTab
          active={activeTab === 1}
          onClick={() => setActiveTab(1)}
        >
          Mint
        </TokenFunctionTab>
        <TokenFunctionTab
          active={activeTab === 2}
          onClick={() => setActiveTab(2)}
        >
          Burn
        </TokenFunctionTab>

      </Row>

      {activeTab === 0 && <BuyPanel type={true} dynasetid={indexpool.id} token={indexpool.symbol} />}
      {activeTab === 1 && <MintPanel type={true} dynasetid={indexpool.id} symbol={indexpool.symbol} pooltoken={pooltokens} token={indexpool.symbol}/>}
      {activeTab === 2 && <BurnPanel type={true} dynasetid={indexpool.id} ptokens={pooltokens} token={indexpool.symbol}/>}
    </MainCard>
  );
};

        // <TokenFunctionTab
        //   active={activeTab === 3}
        //   onClick={() => setActiveTab(3)}
        // >
        //   Swap
        // </TokenFunctionTab>

export default TokenFunctionPanel;
