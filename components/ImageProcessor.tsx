import { Box, TextField } from "@mui/material";
import config from "config";
import { ethers } from "ethers";
import React, { useState } from "react";
import { useContract, useSigner } from "wagmi";
import FileUpload from "./FileUpload";
import AuthenticityArtifact from "interfaces/Authenticity.json";
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
  const [addressList, setAddressList] = useState("");
  const [files, setFiles] = useState<
    (File & { hash?: string; valid?: boolean })[] | null
  >(null);
  const { data: signer } = useSigner();
  const contract = useContract({
    address: config.Contracts.Authenticity,
    abi: AuthenticityArtifact.abi,
    signerOrProvider: signer,
  });

  const hashFiles = async () =>
    Promise.all(
      files.map(async (file) => {
        const hashedFile = file;
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

  const validateAddresses = () => {
    const addresses = addressList.split(",").map((address) => address.trim());
    const invalid = addresses.filter(
      (address) => !ethers.utils.isAddress(address)
    );

    return { addresses, invalid };
  };

  const createProof = async () => {
    const hashedFiles = await hashFiles();
    setFiles(hashedFiles);

    const tx = await contract.writeHash(hashedFiles.map((file) => file.hash));
    console.log("Submitted: ", tx.hash);
    await tx.wait();
    console.log("Complete");
  };

  const validateProof = async () => {
    const { addresses, invalid } = validateAddresses();
    const hashedFiles = await hashFiles();

    if (invalid.length !== 0)
      return console.log({
        error: "Invalid Addresses",
        InvalidAddresses: invalid,
      });
    if (addresses.length > 1 && addresses.length !== hashedFiles.length)
      return console.log({ error: "Address and files length mismatch" });

    const parsedAddresses =
      addresses.length === 1
        ? new Array(hashedFiles.length).fill(addresses[0])
        : addresses;

    const proofArray = (await contract.readHash(
      parsedAddresses,
      hashedFiles.map((file) => file.hash)
    )) as boolean[];

    const proovenFiles = hashedFiles.map((file, i) => {
      file.valid = proofArray[i];
      return file;
    });

    setFiles(proovenFiles);

    console.log({ proofArray });
  };

  return (
    <Box className="flex w-full flex-col gap-6">
      <Box className="flex gap-6">
        <Box className="flex-1">
          <ExecuteButton
            className="w-full h-full"
            variant="contained"
            disabled={!(files && files.length > 0)}
            onClick={createProof}
          >
            Create Proof
          </ExecuteButton>
        </Box>
        <Box className="flex-1 flex flex-col gap-6">
          <TextField
            className="w-full"
            onChange={(e) => setAddressList(e.target.value)}
            placeholder="Proof Addresses (comma delimted)"
          />
          <ExecuteButton
            className="w-full"
            variant="contained"
            disabled={!(files && files.length > 0)}
            onClick={validateProof}
          >
            Validate Proof
          </ExecuteButton>
        </Box>
      </Box>
      <FileUpload files={files} setFiles={setFiles} />
    </Box>
  );
};

export default ImageProcessor;
