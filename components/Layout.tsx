import React, { ReactNode } from "react";
import Head from "next/head";
import Nav from "./Nav";
import { DefaultProps } from "../interfaces";
import Link from "next/link";

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
      <div className="h-screen flex flex-col max-w-4xl mx-auto p-2">
        <header className="mb-2 flex flew-row gap-4 justify-center">
          <Link href="/">Authenticity</Link>
          <FlexSpacer />
          <Nav />
        </header>
        <div className="flex-grow">{children}</div>
        <footer></footer>
      </div>
    </>
  );
};

export default Layout;
