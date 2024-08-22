import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import TableHeading from "../../components/MeetingList/TableHeading";
import UserDataRow from "../../components/MeetingList/UserDataRow";
import PaginationBar from "../../components/ListUsers/PaginationBar";

const MeetingList = () => {
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    // Fetch meeting data from the backend
    fetch("http://localhost:8081/api/meetings",{
      headers:{
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched meetings data:", data); // Debugging data
        setMeetings(data || []); // Ensure data is always an array
      })
      .catch((error) => {
        console.error("Error fetching meetings:", error);
        setError("Error fetching meetings");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Handle the case where meetings might still be undefined or not an array
  const meetingsArray = Array.isArray(meetings) ? meetings : [];

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentMeetings = meetingsArray.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(meetingsArray.length / rowsPerPage);

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
          <h1 className="text-2xl">All Meetings</h1>
          <TableHeading />

          <div className="bg-white min-h-96 max-h-[75vh] h-full overflow-y-scroll overflow-x-hidden connectionRequest-container shadow-xl">
            {currentMeetings.length === 0 ? (
              <div>No meetings available.</div>
            ) : (
              currentMeetings.map((meeting, index) => (
                <UserDataRow
                  key={meeting.id} // Ensure unique key prop
                  meeting={meeting}
                  serialNumber={indexOfFirstRow + index + 1}
                />
              ))
            )}
          </div>

          {/* Integrate PaginationBar */}
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
