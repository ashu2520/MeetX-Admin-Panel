import React from "react";
import { Link } from "react-router-dom";

const ActionButton = ({ userId }) => {
  return (
    <Link
      to={`/users/profile?userId=${userId}`}
      className="border text-sm p-1 rounded-md text-center bg-slate-200 hover:bg-blue-300 hover:cursor-pointer"
    >
      View Profile
    </Link>
  );
};

export default ActionButton;