import React from "react";
import { Link } from "react-router-dom";

const ActionButton = ({ userId }) => {
  // Encode the userId using Base64
  const encodedUserId = btoa(userId);

  return (
    <Link
      to={`/users/profile?userId=${encodedUserId}`}
      className="border text-sm p-1 rounded-md text-center bg-slate-200 hover:bg-blue-300 hover:cursor-pointer"
    >
      View Profile
    </Link>
  );
};

export default ActionButton;
