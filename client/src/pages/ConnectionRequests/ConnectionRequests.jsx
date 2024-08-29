import React, { useEffect, useState, useRef } from "react";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import TableHeading from "../../components/ConnectionRequests/TableHeading";
import UserDataRow from "../../components/ConnectionRequests/UserDataRow";
import Pagi from "./Pagii";

const ConnectionRequests = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(""); // Debounced search query
  const [sortOrder, setSortOrder] = useState('');
  
  const inputRef = useRef(null);

  // Debouncing effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchTerm);
      setCurrentPage(1); // Reset to first page on new search
    }, 300); // 300ms delay for debouncing

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          http://localhost:8081/api/usersConnection?page=${currentPage}&limit=10&search=${debouncedQuery}&sort=${sortOrder}
        );
        if (!response.ok) {
          throw new Error(Network response was not ok: ${response.statusText});
        }
        const result = await response.json();
        setData(result.connections_data);
        setTotalPages(result.totalPages);
      } catch (err) {
        setError(There was an error fetching the data: ${err.message});
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, debouncedQuery, sortOrder]);

  useEffect(() => {
    //checking if input Ref is thier then set its focus forcefully !!
    if (inputRef.current) {
      inputRef.current.focus(); // Forcefully focus on the input element after each render
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleSortOrderChange = () => {
    setSortOrder((prevSortOrder) => {
      if (prevSortOrder === '') {
        return 'asc';
      }
      return prevSortOrder === 'asc' ? 'desc' : 'asc';
    });
  };
  
  return (
    <>
      <NavBar />
      <div className="w-full flex">
        <Sidebar />
        <div className="p-4 w-full flex flex-col gap-4 relative">
          <div className="flex justify-between">
            <h1 className="text-2xl">All Connection Requests</h1>
            <form 
              className="gap-4 flex items-center"
              onSubmit={(e) => { e.preventDefault(); }}
            >
              <label className="text-lg">Search</label>
              <input
                type="text"
                className="text-base p-1 border rounded-md w-4/5 bg-gradient-to-b from-slate-100 to-white"
                placeholder="Type here"
                value={searchTerm}
                onChange={handleSearchChange}
                ref={inputRef} // Attach ref to the input field
              />
              <button className="bgPrimary p-2 rounded-lg text-white">
                Search
              </button>
            </form>
          </div>
          <TableHeading 
            sortOrder={sortOrder}
            onSortOrderChange={handleSortOrderChange}
          />
          <div className="bg-white min-h-96 max-h-[75vh] h-full overflow-y-scroll overflow-x-hidden connectionRequest-container shadow-xl">
            {data.length > 0 ? (
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
                    index={index + 1 + (currentPage - 1) * 10}
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
              <div className="text-red-500 text-center py-4 text-3xl font-bold">
                No Connection Exist
              </div>
            )}
          </div>
          <Pagi 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default ConnectionRequests;