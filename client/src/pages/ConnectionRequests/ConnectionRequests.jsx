import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import TableHeading from "../../components/ConnectionRequests/TableHeading";
import UserDataRow from "../../components/ConnectionRequests/UserDataRow";
import PaginationBar from "../../components/ListUsers/PaginationBar"; // Assuming you have this component

const ConnectionRequests = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("user_id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [noResults, setNoResults] = useState(false);
  const limit = 10;
  

  const fetchData = () => {
    fetch(`http://localhost:8081/api/usersConnection?search=${search}&sortField=${sortField}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("User Connections Data:", data.connections_data);
        setData(data.connections_data);
        setTotalRecords(data.total);
        setNoResults(data.connections_data.length === 0 && search !== ""); // Set no results state if there are no results and a search is performed
      })
      .catch((err) => {
        console.error("There was an error fetching the data:", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [search, sortField, sortOrder, page]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to the first page when searching
    setNoResults(false); // Reset no results state when searching
  };

  const handleSort = () => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);
    setSortField("user_id");
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
            <h1 className="text-2xl">All Connection Requests</h1>
            <form className="gap-4 flex items-center" onSubmit={(e) => e.preventDefault()}>
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
          <TableHeading onSort={handleSort} />
          <div className="bg-white min-h-96 max-h-[75vh] h-full overflow-y-scroll overflow-x-hidden connectionRequest-container shadow-xl">
            {noResults ? (
              <div className="text-center p-4 text-red-600">User ID does not exist</div>
            ) : (
              data.length > 0 ? (
                data.map(
                  ({
                    userId, 
                    send_Accepted,
                    send_Pending,
                    send_Rejected,
                    received_Accepted,
                    received_Pending,
                    received_Rejected
                  }, index) => (
                    <UserDataRow
                      key={userId}
                      index={index + 1}
                      userId={userId}
                      send_Accepted={send_Accepted}
                      send_Pending={send_Pending}
                      send_Rejected={send_Rejected}
                      received_Accepted={received_Accepted}
                      received_Pending={received_Pending}
                      received_Rejected={received_Rejected}
                    />
                  )
                )
              ) : (
                <div className="text-center p-4">No connection requests found</div>
              )
            )}

          </div>
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

export default ConnectionRequests;
