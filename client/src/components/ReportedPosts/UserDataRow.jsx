import React from "react";

const UserDataRow = ({
  index,
  reportingUserId,
  reportedUserId,
  reportedPostId,
  postType,
  reason,
  verifiedStatus,
  rowColor,
}) => {
  return (
    <div className={`border flex ${rowColor}`}>
      <div className="border w-1/12 p-2 text-center">{index}</div>
      <div className="border w-2/12 p-2 text-center">{reportingUserId}</div>
      <div className="border w-2/12 p-2 text-center">{reportedUserId}</div>
      <div className="border w-2/12 p-2 text-center">{reportedPostId}</div>
      <div className="border w-2/12 p-2 text-center">{postType}</div>
      <div className="border w-2/12 p-2 text-center">{reason}</div>
      <div className="border w-2/12 p-2 text-center">{verifiedStatus}</div>
    </div>
  );
};


export default UserDataRow;
