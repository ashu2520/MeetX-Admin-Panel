import React from "react";
import PaymentTabRowHead from "./PaymentTabRowHead";
import PaymentTabRow from "./PaymentTabRow";

const PaymentTab = ({ payments }) => {
  return (
    <div className="mt-10 bg-white relative w-full border rounded-xl overflow-hidden tab">
      <PaymentTabRowHead />
      <div className="flex flex-col overflow-y-scroll max-h-[50vh]">
        {payments.length === 0 ? (
          <div className="p-4 text-center">No data found</div>
        ) : (
          payments.map((payment, index) => (
            <PaymentTabRow key={index} payment={payment} />
          ))
        )}
      </div>
    </div>
  );
};

export default PaymentTab;
