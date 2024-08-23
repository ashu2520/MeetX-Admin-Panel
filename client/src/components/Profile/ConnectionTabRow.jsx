import React from "react";

const ConnectionTabRow = ({ sent, received }) => {
  return (
    <div className="w-full bg-white grid grid-cols-2">
      <div className="grid grid-cols-3">
        <div className="p-2 text-center border">{sent.accepted || 0}</div>
        <div className="p-2 text-center border">{sent.rejected || 0}</div>
        <div className="p-2 text-center border">{sent.pending || 0}</div>
      </div>
      <div className="grid grid-cols-3">
        <div className="p-2 text-center border">{received.accepted || 0}</div>
        <div className="p-2 text-center border">{received.rejected || 0}</div>
        <div className="p-2 text-center border">{received.pending || 0}</div>
      </div>
    </div>
  );
};

export default ConnectionTabRow;
