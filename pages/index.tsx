import Layout, { FlexSpacer } from "../components/Layout";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Button from "@mui/material/Button";

const IndexPage = () => (
  <Layout>
    <div className="h-full flex flex-col gap-4 items-center">
      <FlexSpacer className="max-h-48 min-h-[100px]" />
      <h1 className="text-8xl my-6">Authenticity</h1>
      <Button
        color="primary"
        variant="contained"
        aria-label="upload picture"
        component="label"
      >
        <input hidden accept="image/*" type="file" />
        <div className="pr-2">Upload Image</div>
        <FileUploadIcon />
      </Button>
      <FlexSpacer className="min-h-[100px]" />
    </div>
  </Layout>
);

export default IndexPage;
