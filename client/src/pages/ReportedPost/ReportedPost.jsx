import React, { useEffect, useState, useRef } from "react";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import TableHeading from "../../components/ReportedPosts/TableHeading";
import UserDataRow from "../../components/ReportedPosts/UserDataRow";
import PaginationBar from "../../components/ListUsers/PaginationBar";

const ReportedPosts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [sortField, setSortField] = useState("rp.user_id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [debouncedQuery, setDebouncedQuery] = useState(""); // Debounced search query

  const inputRef = useRef(null);
  // Debouncing effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1); // Reset to first page on new search
    }, 300); // 300ms delay for debouncing

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const fetchData = () => {
    setLoading(true);
    fetch(
      `http://localhost:8081/api/reportedPosts?page=${page}&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}&search=${debouncedQuery}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("Fetched Data:", responseData);
        setData(responseData.reported_posts_list);
        setTotal(responseData.total);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        setError(error.message);
        setLoading(false);
      });
  };
  
  useEffect(() => {
    fetchData();
  }, [page, sortField, sortOrder, debouncedQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Forcefully focus on the input element after each render
    }
  });
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <NavBar />
      <div className="w-full flex bg-gray-200 h-screen">
        <Sidebar />
        <div className="p-4 w-full flex flex-col gap-4">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">All Reported Posts</h1>
            <form className="gap-4 flex items-center">
              <label className="text-lg">Search</label>
              <input
                type="text"
                className="text-base p-1 border rounded-md w-4/5 bg-gradient-to-b from-slate-100 to-white"
                placeholder="Type here"
                value={searchQuery}
                onChange={handleSearchChange}
                ref={inputRef} // Attach ref to the input field
              />

              <button className="bgPrimary p-2 rounded-lg text-white">
                Search
              </button>
            </form>
          </div>
          <div className="bg-white shadow-xl rounded-md">
            <TableHeading onSort={handleSort} />
          </div>
          <div className="bg-white flex-1 shadow-2xl rounded-md overflow-hidden">
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item, index) => (
                <UserDataRow
                  key={index}
                  index={index + 1 + (page - 1) * limit}
                  reportingUserId={item.reporting_user_id}
                  reportedUserId={item.post_owner_user_id}
                  reportedPostId={item.all_post_id}
                  postType={item.post_type}
                  reason={item.remark}
                  verifiedStatus="Pending"
                  rowColor={index % 2 === 0 ? "bg-blue-100" : "bg-white"}
                />
              ))
            ) : (
              <div className="text-red-500 text-center py-4 text-3xl font-bold">
                No reported posts exist
              </div>
            )}
          
          </div>
          <PaginationBar
            currentPage={page}
            totalPages={Math.ceil(total / limit)}
            onPageChange={setPage}
          />
        </div>
      </div>
    </>
  );
};

export default ReportedPosts;
