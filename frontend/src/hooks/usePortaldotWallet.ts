import { useState, useEffect } from "react";

const portaldotChainId = "0x190efb29";
const portaldotNetworkConfig = {
  chainId: portaldotChainId,
  chainName: "Portaldot Testnet V3",
  nativeCurrency: {
    name: "Portaldot",
    symbol: "POT",
    decimals: 18
  },
  rpcUrls: ["https://test-evm-rpc-v3.portaldot.dev"],
  blockExplorerUrls: ["https://node-console.portaldot.dev"]
};

export function usePortaldotWallet() {
  const [accountAddress, setAccountAddress] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    checkExistingConnection();
  }, []);

  async function checkExistingConnection() {
    const ethereum = (window as unknown as { ethereum?: { request: (arguments_: { method: string }) => Promise<string[]> } }).ethereum;
    if (!ethereum) {
      return;
    }
    try {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        setAccountAddress(accounts[0]);
      }
    } catch {
      setErrorMessage("Could not read accounts");
    }
  }

  async function connectWallet() {
    setIsConnecting(true);
    setErrorMessage("");
    const ethereum = (window as unknown as { ethereum?: { request: (arguments_: { method: string; params?: unknown[] }) => Promise<unknown> } }).ethereum;

    if (!ethereum) {
      setErrorMessage("MetaMask is not installed");
      setIsConnecting(false);
      return;
    }

    try {
      const accounts = (await ethereum.request({
        method: "eth_requestAccounts"
      })) as string[];

      if (accounts.length > 0) {
        setAccountAddress(accounts[0]);
        await switchToPortaldot(ethereum);
      }
    } catch {
      setErrorMessage("User rejected connection");
    } finally {
      setIsConnecting(false);
    }
  }

  return {
    accountAddress,
    isConnected: Boolean(accountAddress),
    isConnecting,
    errorMessage,
    connectWallet
  };
}

async function switchToPortaldot(ethereum: { request: (arguments_: { method: string; params?: unknown[] }) => Promise<unknown> }) {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: portaldotChainId }]
    });
  } catch (switchError: unknown) {
    const errorObject = switchError as { code?: number };
    if (errorObject?.code === 4902) {
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [portaldotNetworkConfig]
      });
    }
  }
}
