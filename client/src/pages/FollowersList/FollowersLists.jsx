import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import FollowersTableHeading from "../../components/FollowersList/FollowersTableHeading";
import UserDataRow from "../../components/FollowersList/FollowersDataRow";

const FollowersList = () => {
  const [followers, setFollowers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8081/api/followerlist")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched followers data:", data.followers_data);
        setFollowers(data.followers_data);
      })
      .catch((error) => {
        console.error("Error fetching followers:", error);
        setError("Error fetching followers");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
          <h1 className="text-2xl">Followers List</h1>
          <FollowersTableHeading />
          <div
            style={{
              backgroundColor: "white",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              maxHeight: "75vh",
              overflowY: "scroll",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
            className="hide-scrollbar"
          >
            {followers.length === 0 ? (
              <div>No followers available.</div>
            ) : (
              followers.map((follower, index) => (
                <UserDataRow
                  key={follower.userId}
                  index={index + 1}
                  userId={follower.userId}
                  send_Accepted={follower.send_Accepted}
                  send_Pending={follower.send_Pending}
                  send_Rejected={follower.send_Rejected}
                  received_Accepted={follower.received_Accepted}
                  received_Pending={follower.received_Pending}
                  received_Rejected={follower.received_Rejected}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowersList;
