import React from "react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};

const UserDataRow = ({ meeting, serialNumber }) => {
  return (
    <div className="w-full connectionRequest-UserDataRow flex border">
      <div className="p-2 border w-1/6">{serialNumber}</div>
      <div className="border w-2/6 grid grid-cols-2">
        <div className="p-2 text-center border-r">
          {meeting.scheduling_user_id}
        </div>
        <div className="p-2 text-center">{meeting.initiator_name}</div>
      </div>
      <div className="border w-2/6 grid grid-cols-2">
        <div className="p-2 text-center border-r">{meeting.user_id}</div>
        <div className="p-2 text-center">{meeting.meeting_user_name}</div>
      </div>
      <div className="border w-1/6 p-2 text-center">{meeting.charge}</div>
      <div className="border w-1/6 p-2 text-center">{meeting.amount}</div>
      <div className="border w-3/6 grid grid-cols-3">
        <div className="p-2 text-center border-r">{meeting.start_time}</div>
        <div className="p-2 text-center border-r">{meeting.end_time}</div>
        <div className="p-2 text-center">{formatDate(meeting.date)}</div>
      </div>
      <div className="border w-1/6 p-2 text-center">
        {formatDate(meeting.created_at)}
      </div>
      <div className="border w-1/6 p-2 text-center">{meeting.status}</div>
    </div>
  );
};

export default UserDataRow;