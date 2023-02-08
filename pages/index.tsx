import { FlexSpacer } from "components/Layout";
import ImageProcessor from "components/ImageProcessor";
import ClientOnly from "components/ClientOnly";
import { Box } from "@mui/system";
import Skeleton from "@mui/material/Skeleton";
import GenTagLine from "components/GenTagline";

const IndexPage = () => {
  return (
    <Box className="h-full flex flex-col">
      <Box className="h-full flex flex-col gap-6 lg:flex-row">
        <Box className="h-full flex flex-col basis-1/2 items-center justify-center lg:order-last">
          <Skeleton variant="rounded" width="100%" height={"350px"} />
          <GenTagLine />
        </Box>
        <Box className="h-full flex flex-col basis-1/2 items-center justify-center">
          <ClientOnly>
            <ImageProcessor />
          </ClientOnly>
        </Box>
      </Box>
    </Box>
  );
};

export default IndexPage;
