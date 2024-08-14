import React from "react";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import TableHeading from "../../components/ManageTemplates/TableHeading";
import UserDataRow from "../../components/ManageTemplates/UserDataRow";

const ConnectionRequests = () => {
  const data = [
    { templateName: "Sign Up", createdAt: "27-03-2024", updatedAt: "10-04-2023" },
    { templateName: "Change Password", createdAt: "27-03-2024", updatedAt: "10-04-2023" },
    { templateName: "Create Admin", createdAt: "27-03-2024", updatedAt: "10-04-2023" },
    { templateName: "Forgot Password", createdAt: "27-03-2024", updatedAt: "10-04-2023" },
    { templateName: "Verification Link", createdAt: "27-03-2024", updatedAt: "10-04-2023" },
    { templateName: "User Sign Up", createdAt: "27-03-2024", updatedAt: "10-04-2023" },
    { templateName: "User Forgot Password", createdAt: "27-03-2024", updatedAt: "10-04-2023" },
    { templateName: "User Verification Link", createdAt: "27-03-2024", updatedAt: "10-04-2023" },
    { templateName: "Create Employee", createdAt: "27-03-2024", updatedAt: "10-04-2023" },
  ];

  return (
    <>
    
      <NavBar />
      <div className="w-full flex">
        <Sidebar  />
        <div className="p-4 w-full flex flex-col gap-4 relative">
          <h1 className="text-2xl">EMAIL TEMPLATES</h1>
          <TableHeading />
          <div className="bg-white min-h-96 max-h-[75vh] h-full overflow-y-scroll overflow-x-hidden connectionRequest-container shadow-xl">
            {data.map(({ templateName, createdAt, updatedAt }, index) => (
              <UserDataRow
                key={index}
                templateName={templateName}
                createdAt={createdAt}
                updatedAt={updatedAt}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectionRequests;
