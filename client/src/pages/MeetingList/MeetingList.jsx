import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import TableHeading from "../../components/MeetingList/TableHeading";
import UserDataRow from "../../components/MeetingList/UserDataRow";

const MeetingList = () => {


  return (
    <>
      <NavBar />
      <div className="w-full flex">
        <Sidebar />
        <div className="p-4 w-full flex flex-col gap-4 relative">
          <h1 className="text-2xl">Meeting List</h1>
          <TableHeading />
          <div className="bg-white min-h-96 max-h-[75vh] h-full overflow-y-scroll overflow-x-hidden connectionRequest-container shadow-xl">
                <UserDataRow/>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingList;
