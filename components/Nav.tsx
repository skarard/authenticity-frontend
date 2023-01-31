import React, { ReactNode } from "react";
import Link from "next/link";
import { DefaultProps } from "@interfaces";

const Nav = ({ children }: DefaultProps) => (
  <nav className="flex flex-row gap-4">
    <Link href="/about">About</Link>
    <Link href="/support">Support</Link>
  </nav>
);

export default Nav;
