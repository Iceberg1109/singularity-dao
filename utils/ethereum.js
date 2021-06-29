import axios from "axios";
import web3 from "web3";
import { ethers } from "ethers";
import { ContractAddress } from "../assets/constants/addresses";
import { Currencies } from "./currencies";

export const getGasPrice = async () => {
  const url = "https://gasprice.poa.network/";
  var priceString = await axios.get(url);
  const priceJSON = priceString.data;
  console.log("PRICE FAST:", priceJSON.fast);
  const factorOfSafety = 1.3;
  const fastGasPrice = (priceJSON.fast * factorOfSafety).toFixed().toString();
  return web3.utils.toWei(fastGasPrice, "gwei");
};

/**
 *
 * @param {String} account Ethereum address of the user
 * @param {Number} signer Ethereum Chain ID
 * @returns
 */
export const fetchSDAOBalance = async (account, signer) => {
  if (!account || !signer) return;
  // DYNASET BALANCE
  const tokenContract = new ethers.Contract(ContractAddress.SDAO, DynasetABI, signer);
  const balance = await tokenContract.balanceOf(account);
  return Number(web3.utils.fromWei(balance.toString())).toFixed(8);
};

/**
 *
 * @param {String | Number} amount Amount to be adjusted for the slippage
 * @param {Number} slippage Slippage value in percentage
 * @returns {String}
 */
export const addSlippage = (amount, slippage = Currencies.SDAO.slippagePercent) =>
  (Number(amount) * (1 + slippage / 100)).toFixed(8);

/**
 *
 * @param {String | Number} amount Amount to be adjusted for the slippage
 * @param {Number} slippage Slippage value in percentage
 * @returns {String}
 */
export const reduceSlippage = (amount, slippage = Currencies.SDAO.slippagePercent) =>
  (Number(amount) * (1 - slippage / 100)).toFixed(8);

export const defaultGasLimit = 210000;
export const defaultApprovalAmount = ethers.BigNumber.from(10).pow(28).toString(); // Inspired from UNISWAP default Approval
export const unitBlockTime = 13500; // milliseconds
