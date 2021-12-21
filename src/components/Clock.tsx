import React from "react";
import { useNow } from "../hooks/useNow";

export default function Clock() {
  const now = useNow(1000);
  return <h2>{now.toLocaleTimeString()}</h2>;
}
