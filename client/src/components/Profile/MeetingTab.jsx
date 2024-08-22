import React from "react";
import MeetingTabRowHead from "./MeetingTabRowHead";
import MeetingRow from "./MeetingRow";

const MeetingTab = () => {
  return (
    <div className="mt-10 bg-white relative w-full border rounded-xl overflow-hidden tab">
      <MeetingTabRowHead />
      <div className="flex flex-col overflow-y-scroll max-h-[50vh]">
        <MeetingRow />
        <MeetingRow />
        <MeetingRow />
        <MeetingRow />
      </div>
    </div>
  );
};

export default MeetingTab;
