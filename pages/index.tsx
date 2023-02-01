import Layout, { FlexSpacer } from "components/Layout";
import { useAccount } from "wagmi";
import WalletConnect from "components/WalletConnect";
import ImageProcessor from "components/ImageProcessor";
import ClientOnly from "components/ClientOnly";

const IndexPage = () => {
  const { isConnected } = useAccount();

  return (
    <div className="h-full flex flex-col gap-4 items-center">
      <FlexSpacer className="max-h-48 min-h-[100px]" />
      <h1 className="text-8xl my-6">Authenticity</h1>
      <ClientOnly>
        {isConnected ? <ImageProcessor /> : <WalletConnect />}
      </ClientOnly>
      <FlexSpacer className="min-h-[100px]" />
    </div>
  );
};

export default IndexPage;
