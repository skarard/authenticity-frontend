import { FlexSpacer } from "components/Layout";
import Box from "@mui/material/Box";

const SupportPage = () => (
  <Box className="h-full flex flex-col gap-4 items-center">
    <FlexSpacer className="max-h-48 min-h-[100px]" />
    <h1 className="text-8xl my-6">Support</h1>
  </Box>
);

export default SupportPage;
