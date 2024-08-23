import React from "react";

const PaymentTabRowHead = () => {
  return (
    <div className="bg-white grid grid-cols-8 font-semibold">
      <div className="p-2 text-center border h-full">User Id</div>
      <div className="p-2 text-center border h-full">Username</div>
      <div className="p-2 text-center border h-full">Type</div>
      <div className="p-2 text-center border h-full">Account No</div>
      <div className="p-2 text-center border h-full">IFSC</div>
      <div className="p-2 text-center border h-full">UPI ID</div>
      <div className="p-2 text-center border h-full">Amount</div>
      <div className="p-2 text-center border h-full">Status</div>
    </div>
  );
};

export default PaymentTabRowHead;
