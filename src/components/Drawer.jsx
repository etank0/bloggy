import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDrawer } from "../context/DrawerContext";

function Drawer({ children }) {
  const { isDrawerOpen, toggleDrawer } = useDrawer();
  return (
    <div>
      <div
        className={`${
          isDrawerOpen ? "" : "hidden "
        }top-0 z-40 left-0 h-screen w-full fixed backdrop-blur-md bg-black/60 lg:hidden`}
        onClick={isDrawerOpen ? toggleDrawer : () => {}}
      ></div>
      <ul
        className={`${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } fixed backdrop-blur-md bg-bkg-primary/40 flex flex-col items-center z-50 left-0 top-0 w-[90%] max-w-96 h-screen transition-transform duration-200 ease-in-out lg:hidden`}
      >
        <li className="w-full py-3">
          <div className="h-[4rem] mr-2 flex justify-end items-center lg:hidden">
            <button
              onClick={toggleDrawer}
              className="h-[3rem] w-[3rem] inline-flex items-center justify-center p-2 text-xl text-text-primary hover:text-text-secondary hover:bg-bkg-secondary/40 focus:bg-bkg-secondary/40 rounded-full"
            >
              {isDrawerOpen ? (
                <FontAwesomeIcon icon={faTimes} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </button>
          </div>
        </li>
        {children}
      </ul>
    </div>
  );
}

export default Drawer;
