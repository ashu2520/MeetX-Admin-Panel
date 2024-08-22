import React from "react";

const PaymentTabRow = () => {
  return (
    <div className="bg-white grid grid-cols-7 connectionRequest-UserDataRow">
      <div className="p-2 text-center border h-full">@rohan</div>
      <div className="p-2 text-center border h-full">@karan</div>
      <div className="p-2 text-center border h-full">
        Monthly Product Review
      </div>
      <div className="p-2 text-center border h-full">Rs. 1500</div>
      <div className="p-2 text-center border h-full">Bank Transfer</div>
      <div className="p-2 text-center border h-full">19.11.2024</div>
      <div className="p-2 text-center border h-full">Pending</div>
    </div>
  );
};

export default PaymentTabRow;
