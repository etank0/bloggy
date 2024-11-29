import React, { useState } from "react";
import { Container, Logo } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "../../context/ThemeContext";
import { NavLinks, Drawer } from "../";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSun,
    faMoon,
    faBars,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useDrawer } from "../../context/DrawerContext";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const { theme, toggleTheme } = useTheme();

    // for drawer
    const { isDrawerOpen, toggleDrawer } = useDrawer();

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "My Posts",
            slug: "/posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/posts/add",
            active: authStatus,
        },
    ];

    return (
        <header
            id="header"
            className="py-3 px-2 sticky w-full top-0 z-30 bg-bkg-primary/60 backdrop-blur-md shadow-sm"
        >
            <Container className="px-4">
                <nav className="flex justify-between">
                    <div className="flex items-center mr-4">
                        <div className="mr-2 flex justify-center items-center lg:hidden">
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
                        <Link to="/">
                            <Logo height="4rem" nav />
                        </Link>
                    </div>
                    <div className="flex items-center ml-auto">
                        <ul className="flex items-center ml-auto mr-2">
                            <li className="flex items-center justify-center mr-2">
                                <FontAwesomeIcon icon={faSun}></FontAwesomeIcon>
                            </li>
                            <li className="flex items-center justify-center mr-2">
                                <button
                                    className={`toggleBtn ${theme} bg-bkg-secondary`}
                                    onClick={toggleTheme}
                                >
                                    <div className="thumb bg-primary"></div>
                                </button>
                            </li>
                            <li className="flex items-center justify-center mr-2">
                                <FontAwesomeIcon
                                    icon={faMoon}
                                ></FontAwesomeIcon>
                            </li>
                        </ul>
                        <ul className="hidden lg:flex items-center ml-auto">
                            <NavLinks
                                navItems={navItems}
                                authStatus={authStatus}
                            />
                        </ul>
                    </div>
                </nav>
                <Drawer>
                    <NavLinks navItems={navItems} authStatus={authStatus} inDrawer />
                </Drawer>
            </Container>
        </header>
    );
}

export { };

export default Header;
