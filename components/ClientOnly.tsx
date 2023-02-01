import React, { useEffect, useState } from "react";
import { DefaultProps } from "interfaces";

const ClientOnly = ({ children }: DefaultProps) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  if (!hasMounted) return null;
  return <>{children}</>;
};

export default ClientOnly;
