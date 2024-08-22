import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import TableHeading from "../../components/ConnectionRequests/TableHeading";
import UserDataRow from "../../components/ConnectionRequests/UserDataRow";

const ConnectionRequests = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8081/api/usersConnection",{
      headers:{
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("User Connections Data:", data.connections_data);
        setData(data.connections_data); 
      })
      .catch((err) => {
        setError("There was an error fetching the data: " + err.message);
      })
      .finally(() => {
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
      <div className="w-full flex">
        <Sidebar />
        <div className="p-4 w-full flex flex-col gap-4 relative">
          <h1 className="text-2xl">All Connection Requests</h1>
          <TableHeading />
          <div className="bg-white min-h-96 max-h-[75vh] h-full overflow-y-scroll overflow-x-hidden connectionRequest-container shadow-xl">
            {data.map(
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectionRequests;
