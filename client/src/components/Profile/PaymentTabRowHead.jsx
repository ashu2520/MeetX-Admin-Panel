import React from "react";

const PaymentTabRowHead = () => {
  return (
    <div className="bg-white grid grid-cols-7 font-semibold">
      <div className="p-2 text-center border h-full">Payer's Name</div>
      <div className="p-2 text-center border h-full">Recipient's Name</div>
      <div className="p-2 text-center border h-full">
        Title of Scheduled meeting
      </div>
      <div className="p-2 text-center border h-full">Total Amount</div>
      <div className="p-2 text-center border h-full">Payment Method</div>
      <div className="p-2 text-center border h-full">Due Date</div>
      <div className="p-2 text-center border h-full">Status</div>
    </div>
  );
};

export default PaymentTabRowHead;
