import React from "react";
import PaymentTabRowHead from "./PaymentTabRowHead";
import PaymentTabRow from "./PaymentTabRow";

const PaymentTab = () => {
  return (
    <div className="mt-10 bg-white relative w-full border rounded-xl overflow-hidden tab">
      <PaymentTabRowHead />
      <div className="flex flex-col overflow-y-scroll max-h-[50vh]">
        <PaymentTabRow />
        <PaymentTabRow />
        <PaymentTabRow />
        <PaymentTabRow />
      </div>
    </div>
  );
};

export default PaymentTab;
