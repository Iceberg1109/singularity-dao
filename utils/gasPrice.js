import axios from "axios";
import web3 from "web3";
export const getGasPrice = async () => {
  const url = "https://gasprice.poa.network/";
  var priceString = await axios.get(url);
  const priceJSON = priceString.data;
  console.log("PRICE FAST:", priceJSON.fast);
  const fastGasPrice = priceJSON.fast.toFixed().toString();
  return web3.utils.toWei(fastGasPrice, "gwei");
};

export const defaultGasLimit = 210000;
