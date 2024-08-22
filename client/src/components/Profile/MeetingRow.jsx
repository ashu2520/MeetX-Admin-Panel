import React from "react";

const MeetingRow = ({
  initiator,
  with: meetingWith,
  date,
  time,
  charges,
  status,
}) => {
  return (
    <div className="bg-white connectionRequest-UserDataRow grid grid-cols-6">
      <div className="p-2 text-center">{initiator}</div>
      <div className="p-2 text-center">{meetingWith}</div>
      <div className="p-2 text-center">{date}</div>
      <div className="p-2 text-center">{time}</div>
      <div className="p-2 text-center">₹ {charges}</div>
      <div className="p-2 text-center">{status}</div>
    </div>
  );
};

export default MeetingRow;
