import { Chain, localhost, polygon, polygonMumbai } from "wagmi/chains";

export const parseEnvVar = (value: string, name: string) => {
  if (!value) throw Error(`Environment variable ${name} is not set.`);
  return value;
};

const chains: Record<string, Chain> = {
  localhost: localhost,
  polygon: polygon,
  polygonMumbai: polygonMumbai,
};

export const getActiveChain = (chain: string) => {
  if (!(chain in chains)) throw Error(`Chain ${chain} not supported`);
  return chains[chain];
};
