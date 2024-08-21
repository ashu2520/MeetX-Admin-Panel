import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "react-tooltip";
import axios from "axios";

const ChangePassword = () => {
  const notify = (message) => toast.warning(message);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
      notify("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      notify("New Password and Confirm Password doesn't match");
    }

    var lowerRegex = /[a-z]/;
    var upperRegex = /[A-Z]/;
    var num_regex = /\d/;
    var special_regex = /[^a-zA-Z0-9\s]/;
    var length_regex = /^.{8,16}$/;

    if (!lowerRegex.test(newPassword)) {
      notify("Password must contain a lowercase letter");
    }

    if (!upperRegex.test(newPassword)) {
      notify("Password must contain an uppercase letter");
    }

    if (!num_regex.test(newPassword)) {
      notify("Password must contain a number");
    }

    if (!special_regex.test(newPassword)) {
      notify("Password must contain a special character");
    }

    if (!length_regex.test(newPassword)) {
      notify("Password must be 8-16 characters long");
    } else {
      axios
        .put(
          "http://localhost:8081/api/admins/reset-password",
          {
            old_password: oldPassword,
            new_password: newPassword,
          },
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) notify(res.data.message);
          else notify(res.data.error);
        })
        .catch((err) => {
          notify(err.response.data.error);
        });
    }
  };

  return (
    <>
      <NavBar />
      <div className="w-full flex">
        <Sidebar />
        <div className="p-4 w-full">
          <h1 className="text-2xl">Change Password</h1>
          <div className="m-3 flex p-2 -ml-48">
            <form
              className="grid grid-cols-2 gap-3 content-center w-full"
              onSubmit={handleSubmit}
            >
              <label htmlFor="" className="text-right text-base">
                Old Password :
              </label>
              <input
                type="password"
                placeholder="Old Password"
                className="text-base p-1 border rounded-md w-4/5 bg-gradient-to-b from-slate-100 to-white"
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <label htmlFor="" className="text-right text-base">
                New Password :
              </label>
              <input
                type="password"
                placeholder="New Password"
                data-tooltip-id="my-tooltip"
                data-tooltip-content={
                  "Password must contain a lowercase letter, an uppercase letter, a number, a special character and must be 8-16 characters long"
                }
                className="text-base p-1 border rounded-md w-4/5 bg-gradient-to-b from-slate-100 to-white"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <label htmlFor="" className="text-right text-base">
                Confirm Password :
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="text-base p-1 border rounded-md w-4/5 bg-gradient-to-b from-slate-100 to-white"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div></div>
              <button className="bgPrimary w-fit p-2 text-white rounded-md text-base">
                Save
              </button>
            </form>
          </div>
        </div>
        <ToastContainer />
        <Tooltip id="my-tooltip" />
      </div>
    </>
  );
};

export default ChangePassword;
