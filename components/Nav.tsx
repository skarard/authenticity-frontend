import React from "react";
import Link from "next/link";
import { DefaultProps } from "interfaces";

const Nav = ({ children }: DefaultProps) => (
  <nav className="flex flex-row gap-4">
    <Link href="/about">About</Link>
    <Link href="/support">Support</Link>
    <Link href="/blog">Blog</Link>
  </nav>
);

export default Nav;
