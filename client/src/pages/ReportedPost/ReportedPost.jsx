import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import TableHeading from "../../components/ReportedPosts/TableHeading";
import UserDataRow from "../../components/ReportedPosts/UserDataRow";

const ReportedPosts = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8081/api/reportedPosts",{
      headers:{
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      }
    }) 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("Fetched Data:", responseData);
        if (responseData && responseData.reported_posts_list && Array.isArray(responseData.reported_posts_list)) {
          setData(responseData.reported_posts_list);
        } else {
          setData([]); 
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

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
          <h1 className="text-2xl font-semibold">All Report Requests</h1>
          <div className="bg-white shadow-xl rounded-md">
            <TableHeading />
          </div>
          <div className="bg-white flex-1 shadow-2xl rounded-md overflow-hidden">
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item, index) => (
                <UserDataRow
                  key={index}
                  index={index + 1}
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
              <div>No data available</div> 
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportedPosts;
