import React, { useState, useEffect } from "react";
import UserWalletTableHeading from "../../components/WalletHistory/UserWalletTableHeading";
import Sidebar from "../../components/Sidebar";
import NavBar from "../../components/NavBar";
import UserWalletHistory from "../../components/WalletHistory/UserWalletHistory";
import PaginationBar from "../../components/ListUsers/PaginationBar"; // Import the PaginationBar component

const WalletHistory = () => {
  const [walletHistories, setWalletHistories] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("user_id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const limit = 10;
  useEffect(() => {
    const fetchWalletHistory = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/walletHistory?search=${search}&sortField=${sortField}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setWalletHistories(data.data);
        setTotalRecords(data.total);
      } catch (error) {
        console.error("Error fetching wallet history:", error);
      }
    };

    fetchWalletHistory();
  }, [search, sortField, sortOrder, page]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to the first page when searching
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <NavBar />
      <div className="w-full flex">
        <Sidebar />
        <div className="p-4 w-full flex flex-col gap-4 relative">
          <div className="flex justify-between">
            <h1 className="text-2xl">Wallet History</h1>
            <form
              className="gap-4 flex items-center"
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="text-lg">Search</label>
              <input
                type="text"
                className="text-base p-1 border rounded-md w-4/5 bg-gradient-to-b from-slate-100 to-white"
                placeholder="Type here"
                value={search}
                onChange={handleSearchChange}
              />
              <button className="bgPrimary p-2 rounded-lg text-white">
                Search
              </button>
            </form>
          </div>
          <UserWalletTableHeading onSort={handleSort} />
          <div className="bg-white min-h-96 max-h-[75vh] h-full overflow-y-scroll overflow-x-hidden connectionRequest-container shadow-xl">
            {Array.isArray(walletHistories) && walletHistories.length > 0 ? (
              walletHistories.map((history) => (
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
              ))
            ) : (
              <div className="text-red-500 text-center py-4 text-3xl font-bold">
                No wallet history found
              </div>
            )}
          </div>
          {/* Use PaginationBar for pagination */}
          <PaginationBar
            currentPage={page}
            totalPages={Math.ceil(totalRecords / limit)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default WalletHistory;
