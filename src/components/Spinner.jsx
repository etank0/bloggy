import React from "react";
import "ldrs/ring2";
import { useTheme } from "../context/ThemeContext";

function Spinner({ className = "" }) {
  const { theme } = useTheme();

  return (
    <div className={`flex justify-center items-center w-full ${className}`}>
      <l-ring-2
        size="40"
        stroke="5"
        stroke-length="0.25"
        bg-opacity="0.1"
        color={`${theme === "dark" ? "white" : "#26272a"}`}
        speed="1.0"
      ></l-ring-2>
    </div>
  );
}

export default Spinner;
