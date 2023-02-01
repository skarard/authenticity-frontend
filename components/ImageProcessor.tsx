import { Button } from "@mui/material";
import { ethers } from "ethers";
import React, { useState } from "react";
import FileUpload from "./FileUpload";

function readFileDataAsArrayBuffer(file: File): Promise<string | ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target.result);
    };

    reader.onerror = (err) => {
      reject(err);
    };

    reader.readAsArrayBuffer(file);
  });
}

const ImageProcessor = () => {
  const [files, setFiles] = useState<File[] | null>(null);

  const processImages = async () => {
    const hashedFiles = await Promise.all(
      files.map(async (file) => {
        const hashedFile = file as File & { hash: string };
        const arrayBuffer = await readFileDataAsArrayBuffer(file);
        if (typeof arrayBuffer === "string") return;

        const bytes =
          "0x" +
          [...new Uint8Array(arrayBuffer)]
            .map((x) => x.toString(16).padStart(2, "0"))
            .join("");

        hashedFile.hash = ethers.utils.solidityKeccak256(["bytes"], [bytes]);
        return hashedFile;
      })
    );

    console.log(
      Object.fromEntries(hashedFiles.map((file) => [file.name, file.hash]))
    );
  };
  return (
    <>
      <Button
        className="w-full"
        variant="contained"
        disabled={!(files && files.length > 0)}
        onClick={processImages}
      >
        Verify Images
      </Button>
      <FileUpload files={files} setFiles={setFiles} />
    </>
  );
};

export default ImageProcessor;
