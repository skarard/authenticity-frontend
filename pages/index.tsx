import { FlexSpacer } from "components/Layout";
import { useAccount } from "wagmi";
import ImageProcessor from "components/ImageProcessor";
import ClientOnly from "components/ClientOnly";
import { Box } from "@mui/system";

const IndexPage = () => {
  const { isConnected } = useAccount();

  return (
    <Box className="h-full flex flex-row gap-4 items-center">
      <FlexSpacer className="max-h-48 min-h-[100px]" />
      <h1 className="text-8xl my-6">Authenticity</h1>
      <ClientOnly>
        <ImageProcessor />
      </ClientOnly>
      <FlexSpacer className="min-h-[100px]" />
    </Box>
  );
};

export default IndexPage;
