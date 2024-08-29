import React, { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isTokenChecked, setIsTokenChecked] = useState(false);

  const logout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");

  //   if (token) {
  //     axios
  //       .get("http://localhost:8081/api/admins/current", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((res) => {
  //         if (res.status === 200) {
  //           setIsLoggedIn(true);
  //           setIsTokenValid(true);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err.response?.data.error || err.message);
  //         setIsLoggedIn(false);
  //         setIsTokenValid(false);
  //       })
  //       .finally(() => {
  //         setIsTokenChecked(true);
  //       });
  //   } else {
  //     setIsLoggedIn(false);
  //     setIsTokenChecked(true);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (isTokenChecked && (!isLoggedIn || !isTokenValid)) {
  //     document.body.style.overflow = "hidden";
  //     alert(
  //       "You are not logged in or session has timed out. Please login to continue."
  //     );
  //     window.location.href = "/";
  //     return (
  //       <div className="h-screen flex justify-center items-center text-2xl">
  //         Checking session...
  //       </div>
  //     );
  //   }
  // }, [isTokenChecked, isLoggedIn, isTokenValid]);

  // if (!isTokenChecked) {
  //   document.body.style.overflow = "hidden";
  //   return (
  //     <div className="h-screen flex justify-center items-center text-2xl">
  //       Checking session...
  //     </div>
  //   );
  // }

  // if (isTokenChecked && isLoggedIn && isTokenValid) {
  //   document.body.style.overflow = "auto";
  return (
    <div className="w-full bg-[#DBE3FF] p-2 flex justify-between items-center">
      <img src={logo} alt="MEETX" className="h-8" />
      <Link
        to="/"
        onClick={() => logout()}
        className="bg-blue-500 flex items-center p-2 rounded-lg text-white"
      >
        Log Out
      </Link>
    </div>
  );
  // }

  return (
    <>
      <div className="h-screen flex justify-center items-center text-2xl">
        Redirecting to Login Page...
      </div>
    </>
  );
};

export default NavBar;
