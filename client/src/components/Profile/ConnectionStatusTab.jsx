import React from "react";
import ConnectionTabRowHead from "./ConnectionTabRowHead";
import ConnectionTabRow from "./ConnectionTabRow";

const ConnectionStatusTab = ({ connectionsCount, connecteesCount }) => {
  return (
    <div className="mt-10 bg-white relative w-full border rounded-xl overflow-hidden tab">
      <ConnectionTabRowHead />
      <div className="max-h-[50vh] overflow-y-scroll">
        <ConnectionTabRow sent={connectionsCount} received={connecteesCount} />
      </div>
    </div>
  );
};

export default ConnectionStatusTab;
