import React from "react";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import Editor from "../../components/EditTemplate/Editor";

const EditTemplate = () => {
  return (
    <>
      <NavBar />
      <div className="flex">
        <Sidebar />
        <div className="w-full p-4">
          <div className="rounded-md bg-white shadow-sm text-black sm:text-base text-xs border">
            <h1 className="bg-[#DBE3FF]  text-balck text-left py-2 pl-5 text-base">
              EDIT EMAIL TEMPLATE
            </h1>
            <div className="m-3 flex flex-col border p-2">
              <div className="flex gap-3">
                <label className="text-xl">Subject :</label>
                <input
                  type="text"
                  className="border border-black rounded-xl w-[80%] text-base p-2"
                />
              </div>
              <div className="text-xl my-5">Body : </div>
              <Editor />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTemplate;
