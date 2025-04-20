import React from "react";
import "ldrs/dotStream";
import { Logo } from "../components";
import { useTheme } from "../context/ThemeContext";

function Loader({ className = "" }) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col w-full gap-3 justify-center items-center">
      <Logo className="mb-8" height="3rem" />
      <div className={`flex justify-center items-center w-full ${className}`}>
        <l-dot-stream
          size="100"
          speed="2"
          color={`${theme === "dark" ? "white" : "#26272a"}`}
        ></l-dot-stream>
      </div>
    </div>
  );
}

export default Loader;
