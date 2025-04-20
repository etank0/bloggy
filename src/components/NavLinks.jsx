import React from "react";
import { NavLink } from "react-router-dom";
import { LogoutBtn } from "./";
import { useDrawer } from "../context/DrawerContext";

function NavLinks({ navItems, authStatus, inDrawer }) {
  const { isDrawerOpen, toggleDrawer } = useDrawer();
  return (
    <>
      {navItems.map((item) =>
        item.active ? (
          <li key={item.name} className={`${inDrawer ? "my-4" : "mr-2"}`}>
            <NavLink
              onClick={isDrawerOpen ? toggleDrawer : () => {}}
              to={item.slug}
              className={({ isActive }) =>
                `${
                  isActive && "bg-secondary dark:text-bkg-primary"
                } font-medium inline-bock px-6 py-3 duration-200 dark:hover:text-bkg-primary hover:bg-secondary rounded-full`
              }
              end
            >
              {item.name}
            </NavLink>
          </li>
        ) : null
      )}
      {authStatus && (
        <li>
          <LogoutBtn />
        </li>
      )}
    </>
  );
}

export default NavLinks;
