import React from "react";

const UserDataRow = () => {
  return (
    <>
       <div className="w-full meetingList-UserDataRow flex ">
        <div className="border w-1/12 p-1 text-center">
          1
        </div>
         
          <div className="grid grid-cols-2 w-2/12  ">
            <div className=" p-1 text-center border ">123</div>
            <div className=" p-1 text-center">ABC</div>
          </div>
        
          
          <div className="grid grid-cols-2 w-2/12">
            <div className=" p-1 text-center">234</div>
            <div className=" p-1 text-center">ASD</div>
          </div>
        
        <div className="border w-1/12 p-1  text-center">
          1200
        </div>
        <div className="border w-1/12 p-1  text-center">
          2000
        </div>
          <div className="grid grid-cols-3">
            <div className=" p-1 text-center">10:00</div>
            <div className="p-1 text-center">1:00</div>
            <div className=" p-1 text-center">12/08/2025</div>
          </div>
        <div className="border w-1/12 p-1  text-center">
         12 dec
        </div>
        <div className="border w-1/12 p-1  text-center">
          Done
        </div>
      </div>
    </>
  );
};

export default UserDataRow;
