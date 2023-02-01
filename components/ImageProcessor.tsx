import React, { useState } from "react";
import FileUpload from "./FileUpload";

const ImageProcessor = () => {
  const [files, setFiles] = useState<File[] | null>(null);

  return <FileUpload files={files} setFiles={setFiles} />;
};

export default ImageProcessor;
