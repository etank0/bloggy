import React from "react";
import bloggyLogo from "../assets/bloggy.svg";
import bloggyLogoDark from "../assets/bloggy-dark.svg";
import bloggyNav from "../assets/bloggyNav.svg";
import bloggyNavDark from "../assets/bloggyNav-dark.svg";
import { useTheme } from "../context/ThemeContext";

function Logo({ height = "5rem", nav = false, className = "" }) {
  const { theme } = useTheme();
  let logo = undefined;
  if (theme == "dark" && nav) {
    logo = bloggyNavDark;
  } else if (theme == "dark" && !nav) {
    logo = bloggyLogoDark;
  } else if (theme == "light" && nav) {
    logo = bloggyNav;
  } else {
    logo = bloggyLogo;
  }

  return (
    <div style={{ height: height }} className={`${className}`}>
      <img className="h-full" src={logo} alt="Bloggy Brand" />
    </div>
  );
}

export default Logo;
