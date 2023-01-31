import { parseEnvVar } from "utils";

const config = {
  WalletConnect: {
    ProjectId: parseEnvVar(
      process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
      "NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID"
    ),
  },
};

export default config;
