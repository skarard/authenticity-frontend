import { FlexSpacer } from "components/Layout";
import { useAccount } from "wagmi";
import ImageProcessor from "components/ImageProcessor";
import ClientOnly from "components/ClientOnly";
import { Box } from "@mui/system";
import Skeleton from "@mui/material/Skeleton";

const IndexPage = () => {
  const { isConnected } = useAccount();

  return (
    <Box className="h-full flex flex-col">
      <FlexSpacer className="w-full max-h-48 min-h-[100px]" />
      <Box className="h-full flex flex-row gap-40">
        <Box className="h-full flex flex-col basis-1/2 items-center justify-center">
          <ClientOnly>
            <ImageProcessor />
          </ClientOnly>
        </Box>
        <Box className="h-full flex flex-col basis-1/2 items-center justify-center">
          <Skeleton variant="rectangular" width="100%" height="75%" />
        </Box>
      </Box>
      <FlexSpacer className="min-h-[100px]" />
    </Box>
  );
};

export default IndexPage;
