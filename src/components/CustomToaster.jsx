import React from "react";
import { Toaster } from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";

function CustomToaster() {
  const { theme } = useTheme();
  const styling =
    theme === "dark"
      ? {
          background: "#212121",
          color: "#fff",
        }
      : {
          background: "#fff",
          color: "#000",
        };
  return (
    <Toaster
      toastOptions={{
        style: styling,
        duration: 4000,
      }}
    />
  );
}

export default CustomToaster;
