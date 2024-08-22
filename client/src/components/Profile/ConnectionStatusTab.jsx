import React from "react";
import ConnectionTabRowHead from "./ConnectionTabRowHead";
import ConnectionTabRow from "./ConnectionTabRow";

const ConnectionStatusTab = () => {
  return (
    <>
      <div className="mt-10 bg-white relative w-full border rounded-xl overflow-hidden tab">
        <ConnectionTabRowHead />
        <div className="max-h-[50vh] overflow-y-scroll">
          <ConnectionTabRow />
          <ConnectionTabRow />
        </div>
      </div>
    </>
  );
};

export default ConnectionStatusTab;
