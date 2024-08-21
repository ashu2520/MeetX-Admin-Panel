import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import TableHeading from "../../components/ListUsers/TableHeading";
import UserDataRow from "../../components/ListUsers/UserDataRow";

const ListUsers = () => {
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const limit = 10;
  const location = useLocation();
  const navigate = useNavigate();

  // Function to extract query parameters
  const getQueryParams = (query) => {
    return new URLSearchParams(query);
  };

  // Set the current page based on query parameters
  useEffect(() => {
    const queryParams = getQueryParams(location.search);
    const page = parseInt(queryParams.get("page")) || 1;
    setCurrentPage(page);
  }, [location.search]);

  // Fetch data whenever the current page changes
  useEffect(() => {
    fetch(
      `http://localhost:8081/api/usersList?page=${currentPage}&limit=${limit}`,{
        headers:{
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        }
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUsersData(data.users_table_data);
        setTotalPages(data.pagination.total_pages);
      })
      .catch((err) => {
        setError("There was an error fetching the data: " + err.message);
      });
  }, [currentPage]);

  // Handle page changes and update the URL query parameters
  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`?page=${page}&limit=${limit}`);
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
            <form className="gap-4 flex items-center">
              <label className="text-lg">Search</label>
              <input
                type="text"
                className="text-base p-1 border rounded-md w-4/5 bg-gradient-to-b from-slate-100 to-white"
                placeholder="Type here"
              />
              <button className="bgPrimary p-2 rounded-lg text-white">
                Search
              </button>
            </form>
          </div>
          <TableHeading />
          <div className="bg-white min-h-96 max-h-[75vh] h-full overflow-y-scroll overflow-x-hidden connectionRequest-container shadow-xl">
            {usersData.map(
              (
                {
                  id,
                  username,
                  email,
                  mobile_number,
                  verified_status,
                  created_at,
                },
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListUsers;
