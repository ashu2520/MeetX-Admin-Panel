import React from "react";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";

const Settings = () => {
    return (
        <>
        <NavBar/>
        <div className="w-full flex">
            <Sidebar />
            <div className="flex flex-col w-full">
                Settings Page Here
            </div>
        </div>
        </>
      )
}

export default Settings