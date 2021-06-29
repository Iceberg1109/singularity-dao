import React from "react";
import { Container } from "reactstrap";
import Admin from "layouts/Admin.js";
import { useRouter } from "next/router";
import { Currencies } from "../../../utils/currencies";

import TokenFunctionPanel, { PanelTypes } from "../../../components/TokenFunctionPanelStake/index.js";
function StakeWithdraw() {
  const router = useRouter();
  const { poolid } = router.query;

 let token;
 let address; 
 let currencyid;
 console.log(poolid[0]);

 if(poolid[0].toString() === "0"){
   console.log("test");
   token = "SDAO LP";
   address = "0x4c78b6566864ae6304c2c2a4c43b74dafaac167e";
   currencyid = Currencies.SDAO_LP.id;

 }else if(poolid[0].toString() === "1"){
      token = "AGIX LP";
      address = "0x5318855ad173220e446002c01d5ee5f940502e70";
      currencyid = Currencies.AGIX_LP.id; 
      console.log("test 1");
 }

  return (
    <Container className="my-4">
      <TokenFunctionPanel panelType="WITHDRAW" id={poolid[0].toString()} token={token} address={address} currencyid={currencyid}/>
    </Container>
  );
}

StakeWithdraw.layout = Admin;

export default StakeWithdraw;
