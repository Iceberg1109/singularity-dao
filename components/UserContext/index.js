import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const Context = React.createContext({});
const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  1: process.env.RPC_URL_1,
  3: process.env.RPC_URL_3,
};
const SUPPORTED_CONNECTORS = ["injected", "walletconnect"];

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 42, 1337],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1], 3: RPC_URLS[3] },
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

export const resetWalletConnector = (connector) => {
  if (
    connector &&
    connector instanceof WalletConnectConnector &&
    connector.walletConnectProvider?.wc?.uri
  ) {
    connector.walletConnectProvider = undefined;
  }
};

const networks = {
  1: "Mainnet",
  4: "Rinkeby",
  3: "Ropsten",
  42: "Kovan",
  1337: "Local",
};

const Provider = ({ children }) => {
  const { isReady } = useRouter();
  const { connector, account, activate, deactivate, chainId, library, ...r } =
    useWeb3React();

  useEffect(() => {
    if (isReady) {
      const connected = localStorage.getItem("connected");

      if (connected === "injected") {
        activate(injected);
      } else if (connected === "walletconnect") {
        activate(walletconnect);
      }
    }
  }, [isReady]);

  const connect = async (type) => {
    if (!SUPPORTED_CONNECTORS.includes(type)) {
      return;
    }

    if (type == "walletconnect") {
      await activate(walletconnect);
      localStorage.setItem("connected", "walletconnect");
    } else if (type == "injected") {
      await activate(injected);
      localStorage.setItem("connected", "injected");
    }
  };

  const disconnect = async () => {
    await deactivate();
    localStorage.setItem("connected", "n");
  };

  return (
    <Context.Provider
      value={{
        library,
        account,
        connect,
        disconnect,
        chainId,
        network: networks[chainId],
        connector,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
export const UserProvider = Provider;

export const useUser = () => {
  return useContext(Context);
};
