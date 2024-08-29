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
    <div
      className={`w-full ReportRequest-UserDataRow flex hover:bg-gray-100 ${rowColor}`}
    >
      <div className="p-2 border w-1/12 text-center">{index}</div>
      <div className="p-2 border w-2/12 text-center">{reportingUserId}</div>
      <div className="p-2 border w-2/12 text-center">{reportedUserId}</div>
      <div className="p-2 border w-2/12 text-center">{reportedPostId}</div>
      <div className="p-2 border w-2/12 text-center">{postType}</div>
      <div className="p-2 border w-2/12 text-center">{reason}</div>
      <div className="p-2 border w-2/12 text-center">{verifiedStatus}</div>
    </div>
  );
};

export default UserDataRow;
