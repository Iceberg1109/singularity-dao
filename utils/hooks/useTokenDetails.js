import { ethers } from "ethers";
import IUniswapV2ERC20 from "@uniswap/v2-core/build/IUniswapV2ERC20.json";
import { useEffect, useState } from "react";

const isEth = (symbol) => symbol === "WETH" || symbol === "ETH";

export function useTokenDetails(address, account, library) {
  const [details, setDetails] = useState({ loading: false, data: undefined, error: undefined });

  const fetchDetails = async () => {
    setDetails({ ...details, loading: true, error: undefined });
    try {
      if (!address || !account || !library) return;
      const signer = await library.getSigner(account);
      const tokenContract = new ethers.Contract(address, IUniswapV2ERC20.abi, signer);
      let [symbol, decimals] = await Promise.all([
        tokenContract.callStatic.symbol(),
        tokenContract.callStatic.decimals(),
      ]);
      symbol = symbol.replace("WETH", "ETH");
      const getBalance = isEth(symbol) ? () => signer.getBalance() : () => tokenContract.callStatic.balanceOf(account);

      const updatedData = { symbol, address, getBalance, decimals, contract: tokenContract };
      setDetails({
        ...details,
        loading: false,
        data: details.data ? { ...details.data, ...updatedData } : updatedData,
      });
    } catch (error) {
      setDetails({ ...details, loading: false, error: error });
    }
  };

  useEffect(() => fetchDetails(), [address, account, library]);

  return { ...details, refetch: fetchDetails };
}
