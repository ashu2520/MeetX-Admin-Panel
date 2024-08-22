import React from "react";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";

const Withdraw = () => {
  return (
    <>
    <NavBar/>
    <div className="w-full flex">
        <Sidebar />
        <div className="flex flex-col w-full">
            Withdraw List Page Here
        </div>
    </div>
    </>
  )
}

export default Withdraw