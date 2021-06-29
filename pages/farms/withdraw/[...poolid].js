import React from "react";
import { Container } from "reactstrap";
import Admin from "layouts/Admin.js";
import { useRouter } from "next/router";
import { Currencies } from "../../../utils/currencies";

import TokenFunctionPanel, { PanelTypes } from "../../../components/TokenFunctionPanelStake/index.js";
function StakeWithdraw() {
 const { query} = useRouter();

 let token;
 let address; 
 let currencyid;
 let id;

 if(query.poolid!=null){
    
    id = query.poolid[0]

   if( id === "0"){

     token = "SDAO LP";
     address = "0x4c78b6566864ae6304c2c2a4c43b74dafaac167e";
     currencyid = Currencies.SDAO_LP.id;

   } else if( id === "1"){
        token = "AGIX LP";
        address = "0x5318855ad173220e446002c01d5ee5f940502e70";
        currencyid = Currencies.AGIX_LP.id; 
        console.log("test 1");
   }
 }


  return (
    <Container className="my-4">
      <TokenFunctionPanel panelType="WITHDRAW" id={id} token={token} address={address} currencyid={currencyid}/>
    </Container>
  );
}

StakeWithdraw.layout = Admin;

export default StakeWithdraw;
