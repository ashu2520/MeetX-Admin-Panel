import React, { useEffect, useState, useRef, useCallback } from "react";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
// import SlNoColumn from "../../components/MeetingList/SlNoColumn";
import SlNoColumn from "../../components/MeetingList/SlNoColumn"
import MeetingInitiatorColumn from "../../components/MeetingList/MeetingInitiatorColumn";
import MeetingWithColumn from "../../components/MeetingList/MeetingWithColumn";
import ChargeColumn from "../../components/MeetingList/ChargeColumn";
import AmountColumn from "../../components/MeetingList/AmountColumn";
import TimeColumn from "../../components/MeetingList/TimeColumn";
import CreatedAtColumn from "../../components/MeetingList/CreatedAtColumn";
import StatusColumn from "../../components/MeetingList/StatusColumn";
import UserDataRow from "../../components/MeetingList/UserDataRow";
import PaginationBar from "../../components/ListUsers/PaginationBar";

const MeetingList = () => {
  const [meetings, setMeetings] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const rowsPerPage = 5;
  const inputRef = useRef(null);

  const fetchMeetings = useCallback(() => {
    setLoading(true);

    const queryParams = new URLSearchParams({
      page: currentPage,
      rowsPerPage,
      sortField,
      sortOrder,
      searchTerm,
    }).toString();
    console.log(sortField, sortOrder);
    fetch(`http://localhost:8081/api/meetings?${queryParams}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched meetings data:", data);
        setMeetings(data.meetings || []);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching meetings:", error);
        setError("Error fetching meetings");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, sortField, sortOrder, searchTerm]);

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

  // const handleSort = (field) => {
  //   // If the field is different from the current sort field, reset sort order to 'asc'
  //   if (field !== sortField) {
  //     setSortOrder('asc');
  //     setSortField(field);
  //   } else {
  //     // Toggle between 'asc' and 'desc' if clicking on the same field
  //     setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  //   }
  // };
  const handleSort = (field) => {
    setSortField(field);
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' && sortField === field ? 'desc' : 'asc'));
  };
  

  const handleSearch = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    fetchMeetings();
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Forcefully focus on the input element after each render
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <NavBar />
      <div className="w-full flex">
        <Sidebar />
        <div className="p-4 w-full flex flex-col gap-4 relative">
          <div className="flex justify-between">
            <h1 className="text-2xl">All Meetings</h1>
            <form className="gap-4 flex items-center" onSubmit={handleSearch}>
              <label className="text-lg">Search</label>
              <input
                type="text"
                className="text-base p-1 border rounded-md w-4/5 bg-gradient-to-b from-slate-100 to-white"
                placeholder="Type here"
                value={searchTerm}
                onChange={handleInputChange}
                ref={inputRef}
              />
              <button className="bgPrimary p-2 rounded-lg text-white">
                Search
              </button>
            </form>
          </div>
          
          {/* Table Heading Render */}
          <div className="bg-white border flex shadow-md">
            <SlNoColumn />
            <MeetingInitiatorColumn
              sortBy={sortField}
              sortDirection={sortOrder}
              onSort={handleSort}
            />
            <MeetingWithColumn
              sortBy={sortField}
              sortDirection={sortOrder}
              onSort={handleSort}
            />
            <ChargeColumn
              sortBy={sortField}
              sortDirection={sortOrder}
              onSort={handleSort}
            />
            <AmountColumn
              sortBy={sortField}
              sortDirection={sortOrder}
              onSort={handleSort}
            />
            <TimeColumn
              sortBy={sortField}
              sortDirection={sortOrder}
              onSort={handleSort}
            />
            <CreatedAtColumn
              sortBy={sortField}
              sortDirection={sortOrder}
              onSort={handleSort}
            />
            <StatusColumn
              sortBy={sortField}
              sortDirection={sortOrder}
              onSort={handleSort}
            />
          </div>

          {/* Meeting List Render */}
          <div className="bg-white min-h-96 max-h-[75vh] h-full overflow-y-scroll overflow-x-hidden connectionRequest-container shadow-xl">
            {meetings.length === 0 ? (
              <div className="text-red-500 text-center py-4 text-3xl font-bold">
                No Meetings Available
              </div>
            ) : (
              meetings.map((meeting, index) => (
                <UserDataRow
                  key={meeting.id}
                  meeting={meeting}
                  serialNumber={(currentPage - 1) * rowsPerPage + index + 1}
                />
              ))
            )}
          </div>

          {/* Pagination */}
          <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default MeetingList;
