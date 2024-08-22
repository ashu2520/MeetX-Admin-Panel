import React from "react";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";

const Employee = () => {
  return (
    <>
    <NavBar/>
    <div className="w-full flex">
        <Sidebar />
        <div className="flex flex-col w-full">
            Employee Page Here
        </div>
    </div>
    </>
  )
}

export default Employee