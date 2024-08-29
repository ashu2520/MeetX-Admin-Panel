import React from "react";

const FollowerTabRow = ({ sentRequests, receivedRequests }) => {
  const sentAccepted = sentRequests?.accepted || 0;
  const sentRejected = sentRequests?.rejected || 0;
  const sentPending = sentRequests?.pending || 0;

  const receivedAccepted = receivedRequests?.accepted || 0;
  const receivedRejected = receivedRequests?.rejected || 0;
  const receivedPending = receivedRequests?.pending || 0;

  return (
    <div className="bg-white grid grid-cols-6 connectionRequest-UserDataRow">
      <div className="p-2 text-center">{sentAccepted}</div>
      <div className="p-2 text-center">{sentRejected}</div>
      <div className="p-2 text-center">{sentPending}</div>
      <div className="p-2 text-center">{receivedAccepted}</div>
      <div className="p-2 text-center">{receivedRejected}</div>
      <div className="p-2 text-center">{receivedPending}</div>
    </div>
  );
};

export default FollowerTabRow;
