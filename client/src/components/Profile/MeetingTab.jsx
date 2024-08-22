import React from "react";
import MeetingTabRowHead from "./MeetingTabRowHead";
import MeetingRow from "./MeetingRow";

const MeetingTab = ({ meetings }) => {
  return (
    <div className="mt-10 bg-white relative w-full border rounded-xl overflow-hidden tab">
      <MeetingTabRowHead />
      <div className="flex flex-col overflow-y-scroll max-h-[50vh]">
        {meetings.length > 0 ? (
          meetings.map((meeting) => (
            <MeetingRow
              key={meeting.id}
              initiator={meeting["Meeting Initiator"]}
              with={meeting["Meeting With"]}
              date={new Date(meeting.date).toLocaleDateString()}
              time={`${new Date(
                meeting.date
              ).toLocaleTimeString()} - ${new Date(
                meeting.date
              ).toLocaleTimeString()}`}
              charges={meeting["charges per hour"]}
              status={meeting.status}
            />
          ))
        ) : (
          <div className="p-4 text-center">No meetings scheduled</div>
        )}
      </div>
    </div>
  );
};

export default MeetingTab;
