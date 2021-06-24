import { ChainId, Currency, Token, WETH } from "@uniswap/sdk";
import { ContractAddress } from "../assets/constants/addresses";
import { ethers, Signer } from "ethers";
import { abi as DynasetABI } from "../assets/constants/abi/Dynaset.json";
import web3 from "web3";

export const Currencies = {
  ETH: {
    id: "eth",
    name: "ETH",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png",
    unit: "ether",
    allowInDropdown: true,
  },
  SDAO: {
    id: "sdao",
    name: "SDAO",
    icon: "https://www.singularitydao.ai/file/2021/05/SINGDAO-LOGO-1-768x768.jpg",
    address: ContractAddress.SDAO,
    decimal: 18,
    unit: "gwei",
    abi: DynasetABI,
    slippagePercent: 0.5,
    allowInDropdown: true,
  },
  SDAO_LP: {
    id: "sdao_lp",
    name: "SDAO LP",
    icon: "https://www.singularitydao.ai/file/2021/05/SINGDAO-LOGO-1-768x768.jpg",
    address: ContractAddress.LP_TOKEN,
    decimal: 18,
    unit: "gwei",
    abi: DynasetABI,
    allowInDropdown: false,
  },
};

/**
 *
 * @param {*} id ID of the currency to be filtered
 * @returns
 */
export const getCurrencyById = (id) => {
  return Object.values(Currencies).find((el) => el.id === id);
};

/**
 *
 * @param {*} id ID of the currency whose token is needed
 * @returns {ethers.Contract} Token
 */
export const getErc20TokenById = (id, { chainId = ChainId.ROPSTEN, signer } = {}) => {
  if (id === Currencies.ETH.id) {
    return WETH[chainId];
  }
  const currency = getCurrencyById(id);
  if (!currency) throw new Error("Invalid currency id");
  if (!signer) throw new Error("Invalid signer");
  return new ethers.Contract(currency.address, currency.abi, signer);
};

/**
 *
 * @param {*} currencyId
 * @param {*} account
 * @param {{chainId: Number, signer: Signer}} param2
 * @returns
 */
export const getBalance = async (currencyId, account, { chainId, signer } = {}) => {
  if (!signer) throw new Error("Invalid signer");
  if (currencyId === Currencies.ETH.id) {
    const balance = await signer.getBalance();
    return Number(web3.utils.fromWei(balance.toString())).toFixed(8);
  }
  
  const token = getErc20TokenById(currencyId, { chainId, signer });
  const balance = await token.balanceOf(account);
  return Number(web3.utils.fromWei(balance.toString())).toFixed(8);
};

export const getUniswapToken = (id, { chainId } = { chainId: ChainId.ROPSTEN }) => {
  if (id === Currencies.ETH.id) {
    return WETH[chainId];
  }
  const currency = getCurrencyById(id);
  if (!currency) throw new Error("Invalid currency id");
  return new Token(chainId, currency.address, currency.decimal);
};
