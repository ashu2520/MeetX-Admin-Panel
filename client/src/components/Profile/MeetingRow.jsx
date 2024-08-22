import React from "react";

const MeetingRow = () => {
  return (
    <div className="bg-white connectionRequest-UserDataRow grid grid-cols-6">
      <div className="p-2 text-center">@rohan</div>
      <div className="p-2 text-center">@rahul</div>
      <div className="p-2 text-center">24.04.2024</div>
      <div className="p-2 text-center">08:30 PM - 10:30 PM</div>
      <div className="p-2 text-center">Rs. 300</div>
      <div className="p-2 text-center">Scheduled</div>
    </div>
  );
};

export default MeetingRow;
