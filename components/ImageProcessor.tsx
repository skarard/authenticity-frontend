import { Button } from "@mui/material";
import config from "config";
import { ethers } from "ethers";
import React, { useState } from "react";
import { useContract, useSigner, useSwitchNetwork } from "wagmi";
import FileUpload from "./FileUpload";
import AuthenticityArtifact from "interfaces/Authenticity.json";
import { getActiveChain } from "utils";
import ExecuteButton from "./ExecuteButton";

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
  const { data: signer } = useSigner();
  const contract = useContract({
    address: config.Contracts.Authenticity,
    abi: AuthenticityArtifact.abi,
    signerOrProvider: signer,
  });
  const { switchNetworkAsync } = useSwitchNetwork();
  const activeChain = getActiveChain(config.WalletConnect.ActiveChain);

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

    const tx = await contract.writeHash(hashedFiles.map((file) => file.hash));
    console.log("Submitted: ", tx.hash);
    await tx.wait();
    console.log("Complete");
  };

  return (
    <>
      <ExecuteButton
        className="w-full"
        variant="contained"
        disabled={!(files && files.length > 0)}
        onClick={processImages}
      >
        Create Certificate
      </ExecuteButton>
      <FileUpload files={files} setFiles={setFiles} />
    </>
  );
};

export default ImageProcessor;
