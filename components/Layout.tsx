import React from "react";
import Head from "next/head";
import Nav from "./Nav";
import Link from "next/link";
import { DefaultProps } from "interfaces";
import WalletConnect from "./WalletConnect";
import { Box } from "@mui/material";

export const FlexSpacer = ({ className }: { className?: string }) => (
  <div className={"flex-grow " + className} />
);

const Layout = ({ children }: DefaultProps) => {
  return (
    <>
      <Head>
        <title>Authenticity</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box className="h-screen flex flex-col max-w-4xl mx-auto p-2">
        <header className="mb-2 flex flew-row gap-4 justify-center items-center">
          <Link href="/">Authenticity</Link>
          <FlexSpacer />
          <Nav />
          <WalletConnect />
        </header>
        <Box className="flex-grow">{children}</Box>
        <footer></footer>
      </Box>
    </>
  );
};

export default Layout;
