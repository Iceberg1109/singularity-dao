import { useState } from "react";
import { Row, Card } from "reactstrap";
import styled from "styled-components";
import BuyPanel from "./BuyPanel";
import MintPanel from "components/MintOptions";
// import BurnPanel from "./BurnPanel";
// import SwapPanel from "./SwapPanel";

const MainCard = styled(Card)`
  padding: 40px;
  max-width: 600px;
  color: #ffffff;
  background-clip: padding-box;
  height: 85%;
  margin-left: auto;
  margin-right: auto;
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

// const TokenFunctionTab = styled.div`
//   border: ${({ theme }) => `1px solid ${theme.color.default}`};
//   background-color: ${({ theme, active }) =>
//     active ? theme.color.default : ""};
//   color: ${({ theme, active }) =>
//     active ? theme.color.white : theme.color.default};
//   cursor: pointer;
//   padding: 4px 10px;
//   font-size: 16px;
//   font-weight: 600;
//   width: 120px;
//   text-align: center;
//   height: 35px;
//   &:first-child {
//     border-top-left-radius: 8px;
//     border-bottom-left-radius: 8px;
//   }

//   &:not(:last-child) {
//     border-right: 0;
//   }

//   &:last-child {
//     border-top-right-radius: 8px;
//     border-bottom-right-radius: 8px;
//   }
// `;

// const TabContainer = styled(Row)`
//   justify-content: center;
//   margin-bottom: 5vh;
// `;

const TokenFunctionPanel = () => {

  return (
    <>
      <MainCard>
        <BuyPanel type={true} />
      </MainCard>
    </>
  );
};

export default TokenFunctionPanel;
