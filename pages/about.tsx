import Layout, { FlexSpacer } from "../components/Layout";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Button from "@mui/material/Button";

const IndexPage = () => (
  <div className="h-full flex flex-col gap-4 items-center">
    <FlexSpacer className="max-h-48 min-h-[100px]" />
    <h1 className="text-8xl my-6">About</h1>
  </div>
);

export default IndexPage;
