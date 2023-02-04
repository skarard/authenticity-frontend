import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

const taglines = [
  "Verify the truth with Authenticity",
  "Say goodbye to deep fakes with Authenticity",
  "The future of photo authentication",
  "Blockchain-secured images",
  "The solution to fake news",
  "Your source of authentic information",
  "Protecting the truth, one image at a time",
  "Stay ahead of deep fakes with Authenticity",
  "Empowering the truth through blockchain",
  "Your ultimate tool to validate images.",
];

const GenTagLine = () => {
  const [tagline, setTagline] = useState("");

  useEffect(() => {
    const timerId = setInterval(() => {
      const r = Math.floor(Math.random() * taglines.length);
      setTagline(taglines[r]);
    }, 5000);
    return () => clearInterval(timerId);
  }, []);

  return <Box>{tagline}</Box>;
};

export default GenTagLine;
