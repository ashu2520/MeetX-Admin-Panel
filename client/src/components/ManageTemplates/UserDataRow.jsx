import React from "react";
import { useNavigate } from "react-router-dom";

const UserDataRow = ({ templateName, createdAt, updatedAt }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/edit-template");
  };

  return (
    <div className="w-full connectionRequest-UserDataRow flex">
      <div className="p-2 border w-3/12">{templateName}</div>
      <div className="p-2 border w-3/12 text-center">{createdAt}</div>
      <div className="p-2 border w-3/12 text-center">{updatedAt}</div>
      <div className="p-2 border w-3/12 text-center">
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={handleButtonClick}
        >
          Action
        </button>
      </div>
    </div>
  );
};

export default UserDataRow;
