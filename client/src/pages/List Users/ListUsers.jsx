import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import PaginationBar from "../../components/ListUsers/PaginationBar"; // Import the PaginationBar
import UserDataRow from "../../components/ListUsers/UserDataRow";
import TableH from "./Tableheading";

const ListUsers = () => {
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [error, setError] = useState(null);
  const limit = 10;
  const location = useLocation();
  const navigate = useNavigate();

  // Function to extract query parameters
  const getQueryParams = (query) => {
    return new URLSearchParams(query);
  };

  // Set the current page and other query params based on URL
  useEffect(() => {
    const queryParams = getQueryParams(location.search);
    const page = parseInt(queryParams.get("page")) || 1;
    const search = queryParams.get("search") || "";
    const sortBy = queryParams.get("sortBy") || "id";
    const sortOrder = queryParams.get("sortOrder") || "ASC";
    setCurrentPage(page);
    setSearchQuery(search);
    setSortBy(sortBy);
    setSortOrder(sortOrder);
  }, [location.search]);

  // Fetch data whenever the current page, search, or sorting changes
  useEffect(() => {
    fetch(
      `http://localhost:8081/api/usersList?page=${currentPage}&limit=${limit}&search=${searchQuery}&sortBy=${sortBy}&sortOrder=${sortOrder}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setUsersData(data.users_table_data);
        setTotalPages(data.pagination.total_pages);
      })
      .catch((err) => {
        setError("There was an error fetching the data: " + err.message);
      });
  }, [currentPage, searchQuery, sortBy, sortOrder]);
  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to page 1 on new search
    navigate(`?page=1&limit=${limit}&search=${searchQuery}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
  };
  // Handle sort column change
  const handleSort = (column, order) => {
    console.log(`Sorting by ${column} in ${order} order`);
    setSortBy(column);
    setSortOrder(order);
    navigate(`?page=${currentPage}&limit=${limit}&search=${searchQuery}&sortBy=${column}&sortOrder=${order}`);
  };

  // Handle page changes and update the URL query parameters
  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`?page=${page}&limit=${limit}&search=${searchQuery}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <NavBar />
      <div className="flex">
        <Sidebar />
        <div className="p-4 w-full flex flex-col gap-4 relative">
          <div className="flex justify-between">
            <h1 className="text-2xl">All Connection Requests</h1>
            <form className="gap-4 flex items-center" onSubmit={handleSearch}>
              <label className="text-lg">Search</label>
              <input
                type="text"
                className="text-base p-1 border rounded-md w-4/5 bg-gradient-to-b from-slate-100 to-white"
                placeholder="Type here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bgPrimary p-2 rounded-lg text-white">
                Search
              </button>
            </form>
          </div>
          <TableH
            onSort={handleSort}
            currentSortBy={sortBy}
            currentSortOrder={sortOrder}
          />
          <div className="bg-white min-h-96 max-h-[75vh] h-full overflow-y-scroll overflow-x-hidden connectionRequest-container shadow-xl">
            {usersData.length > 0 ? (
              usersData.map(
                (
                  { id, username, email, mobile_number, verified_status, created_at },
                  index
                ) => (
                  <UserDataRow
                    key={username}
                    index={index + 1}
                    userId={id}
                    Name={username}
                    Email={email}
                    Mobile={mobile_number}
                    type={verified_status}
                    createdAt={created_at}
                  />
                )
              )
            ) : (
              <div className="text-red-500 text-center py-4 text-3xl font-bold">
                No users exist
              </div>
            )}
          </div>
          <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default ListUsers;
