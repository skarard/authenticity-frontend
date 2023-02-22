import { Box, Divider, TextField } from "@mui/material";
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

  const [mode, setMode] = useState("Create Proof");

  const switchMode = (newMode: string) => {
    setMode(newMode);
  };

  return (
    <Box className="flex flex-col gap-4 items-center">
      <Box className="flex w-full flex-col gap-8 bg-crystal/30 p-8 rounded-xl backdrop-blur-md text-lightBlueText items-center shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.3),inset_0_-1px_3px_0_rgba(1,9,31,0.6)]">
        <Box className="text-5xl font-bold">Authenticity</Box>
        <Box className="text-2xl">Provable authenticity for your images.</Box>
        <Box className="w-full h-[1px] bg-divider" />
        <FileUpload files={files} setFiles={setFiles} />
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
      </Box>
      <button className="relative w-fit py-3 px-6 rounded-full overflow-hidden shadow-[0_2px_6px_0_rgba(0,0,0,0.25)]">
        <Box className="relative text-2xl text-[#FFECFF]/80 font-bold leading-none pb-[3px] z-40">
          {mode}
        </Box>
        {/* Inner Glow Effect */}
        <Box className="absolute top-0 left-0 w-full h-full z-30 rounded-full shadow-[inset_0_0_2px_0_rgba(255,255,255,0.3),inset_0_1px_6px_0_rgba(255,255,255,0.25)]" />
        {/* Vertical Gradient */}
        <Box className="absolute top-0 left-0 w-full h-full bg-button-vertical mix-blend-overlay z-20" />
        {/* Horizontal Gradient */}
        <Box className="absolute top-0 left-0 w-full h-full bg-button-horizontal mix-blend-overlay z-10" />
        {/* Background Colour */}
        <Box className="absolute top-0 left-0 w-full h-full bg-buttonPurpleBG z-0" />
      </button>
    </Box>
  );
};

export default ImageProcessor;
