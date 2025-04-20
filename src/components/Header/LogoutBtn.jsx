import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../services/auth";
import { logout } from "../../features/auth/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <button
      className="inline-bock font-medium inline-bock px-6 py-3 duration-200 dark:hover:text-bkg-primary hover:bg-secondary rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
