import { useState } from "react";
import { Row, Card } from "reactstrap";
import styled from "styled-components";
 import BuyPanel from "./BuyPanel";
import MintPanel from "components/MintOptions";
import AddLiquidityPanel from "./AddLiquidityPanel"
import ChartPanel from "./ChartPanel"
// import BurnPanel from "./BurnPanel";
// import SwapPanel from "./SwapPanel";

const MainCard = styled(Card)`
  align-items: center;
  padding: 70px;
  width:80vh;
  color: #fffff;
  background-color:#212121;
  background-clip: padding-box;
  height: 85%;
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
  font-size: 16px;
  font-weight: 600;
  width:120px;
  text-align:center;
  height:35px;
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

const TokenFunctionPanel = () => {
  const [activeTab, setActiveTab] = useState(0);

  
  return (
    <div style={{backgroundColor:'#000000'}}>
      <Row className="justify-content-center" style={{marginBottom:'5vh'}}>
        <TokenFunctionTab
          active={activeTab === 0}
          onClick={() => setActiveTab(0)}
        >Swap
        </TokenFunctionTab>
        <TokenFunctionTab
          active={activeTab === 1}
          onClick={() => setActiveTab(1)}
        >
          Pool
        </TokenFunctionTab>
        <TokenFunctionTab
          active={activeTab === 2}
          onClick={() => setActiveTab(2)}
        >
          Chart
        </TokenFunctionTab>
      </Row>
    <MainCard>
    
       <Row className="justify-content-center">

       {activeTab === 0 && <BuyPanel type={true} />}
       {activeTab === 1 && <AddLiquidityPanel type={true} />}
       {activeTab === 2 && <ChartPanel type={true} />}
        
        </Row>

    </MainCard>
    </div>
  );
};


        // <TokenFunctionTab
        //   active={activeTab === 2}
        //   onClick={() => setActiveTab(2)}
        // >
        //   Stake
        // </TokenFunctionTab>
        // <TokenFunctionTab
        //   active={activeTab === 3}
        //   onClick={() => setActiveTab(3)}
        // >
        //   Swap
        // </TokenFunctionTab>

export default TokenFunctionPanel;
