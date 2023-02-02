import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import config from "config";
import { getActiveChain } from "utils";
import { Button, ButtonProps } from "@mui/material";

const ContractButton = (props: ButtonProps) => {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { switchNetworkAsync } = useSwitchNetwork();
  const { chain } = useNetwork();

  const activeChain = getActiveChain(config.WalletConnect.ActiveChain);

  const chainName = {
    0: "Disconnected",
    137: "Polygon",
    80001: "Polygon Mumbai",
    1337: "Localhost",
  }[activeChain.id];

  const attributes = !isConnected
    ? {
        ...props,
        children: "Connect Wallet",
        onClick: () => open(),
        disabled: false,
      }
    : chain?.unsupported && switchNetworkAsync
    ? {
        ...props,
        children: "Switch to " + chainName,
        onClick: () => switchNetworkAsync(activeChain.id),
        disabled: false,
      }
    : { ...props };

  return <Button {...attributes} />;
};

export default ContractButton;
