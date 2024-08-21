import React, { useState, useEffect } from "react";
import UserWalletTableHeading from "../../components/WalletHistory/UserWalletTableHeading";
import Sidebar from "../../components/Sidebar";
import NavBar from "../../components/NavBar";
import UserWalletHistory from "../../components/WalletHistory/UserWalletHistory";

const WalletHistory = () => {
  const [walletHistories, setWalletHistories] = useState([]);

  useEffect(() => {
    const fetchWalletHistory = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/walletHistory",{
          headers:{
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          }
        });
        const data = await response.json();
        setWalletHistories(data);
      } catch (error) {
        console.error("Error fetching wallet history:", error);
      }
    };

    fetchWalletHistory();
  }, []);

  return (
    <>
      <NavBar />
      <div className="w-full flex">
        <Sidebar />
        <div className="p-4 w-full flex flex-col gap-4 relative">
          <h1 className="text-2xl">Wallet History</h1>
          <UserWalletTableHeading />
          <div className="bg-white min-h-96 max-h-[75vh] h-full overflow-y-scroll overflow-x-hidden connectionRequest-container shadow-xl">
            {walletHistories.map((history) => (
              <UserWalletHistory
                key={history.id}
                user_id={history.user_id}
                schedule_id={history.schedule_id}
                type={history.type}
                accountNo={history.accountNo}
                ifsc={history.ifsc}
                upi_id={history.upi}
                status={history.status}
                amount={history.amount}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletHistory;
