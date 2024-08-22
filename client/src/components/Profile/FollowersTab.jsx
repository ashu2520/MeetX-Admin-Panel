import React from "react";
import FollowerTabRow from "./FollowerTabRow";
import FollowerTabRowHead from "./FollowerTabRowHead";

const FollowersTab = ({ sentRequests, receivedRequests }) => {
  return (
    <>
      <div className="mt-10 bg-white relative w-full border rounded-xl overflow-hidden tab">
        <FollowerTabRowHead />
        <div className="max-h-[50vh] overflow-y-scroll">
          <FollowerTabRow
            sentRequests={sentRequests}
            receivedRequests={receivedRequests}
          />
        </div>
      </div>
    </>
  );
};

export default FollowersTab;
