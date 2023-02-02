import { parseEnvVar } from "utils";

const config = {
  WalletConnect: {
    ProjectId: parseEnvVar(
      process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
      "NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID"
    ),
    ActiveChain: parseEnvVar(
      process.env.NEXT_PUBLIC_ACTIVE_CHAIN,
      "NEXT_PUBLIC_ACTIVE_CHAIN"
    ),
  },
  Contracts: {
    Authenticity: parseEnvVar(
      process.env.NEXT_PUBLIC_AUTHENTICITY_CONTRACT,
      "NEXT_PUBLIC_AUTHENTICITY_CONTRACT"
    ),
  },
};

export default config;
