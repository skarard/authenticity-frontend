import React from "react";
import { AppProps } from "next/app";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import config from "config";
import "../styles/index.css";
import Layout from "components/Layout";

import { getActiveChain } from "utils";

const activeChain = getActiveChain(config.WalletConnect.ActiveChain);

// Wagmi client
const { provider } = configureChains(
  [activeChain],
  [walletConnectProvider({ projectId: config.WalletConnect.ProjectId })]
);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains: [activeChain] }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, [activeChain]);

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WagmiConfig>
      <Web3Modal
        projectId={config.WalletConnect.ProjectId}
        ethereumClient={ethereumClient}
      />
    </>
  );
}

export default App;
