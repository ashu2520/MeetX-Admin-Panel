import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import UserDetails from "../../components/Profile/UserDetails";
import ConnectionStatusTab from "../../components/Profile/ConnectionStatusTab";
import FollowersTab from "../../components/Profile/FollowersTab";
import MeetingTab from "../../components/Profile/MeetingTab";
import PaymentTab from "../../components/Profile/PaymentTab";

const Profile = () => {
  const [activeTab, setActive] = useState("connectionStatus");
  const [userData, setUserData] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [followersStatus, setFollowersStatus] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [payments, setPayments] = useState([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");

  useEffect(() => {
    if (!userId) {
      console.error("User ID is missing or invalid in query parameters.");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(
          `http://localhost:8081/api/profile/${userId}`
        );
        if (!userResponse.ok) {
          throw new Error(`HTTP error! status: ${userResponse.status}`);
        }
        const userData = await userResponse.json();
        setUserData(userData);

        // Fetch connection status
        const connectionResponse = await fetch(
          `http://localhost:8081/api/connectionStatus/${userId}`
        );
        if (!connectionResponse.ok) {
          throw new Error(`HTTP error! status: ${connectionResponse.status}`);
        }
        const connectionData = await connectionResponse.json();
        setConnectionStatus(connectionData);

        // Fetch followers status
        const followersResponse = await fetch(
          `http://localhost:8081/api/followerStatus/${userId}`
        );
        if (!followersResponse.ok) {
          throw new Error(`HTTP error! status: ${followersResponse.status}`);
        }
        const followersData = await followersResponse.json();
        setFollowersStatus(followersData);

        // Fetch meetings data
        const meetingsResponse = await fetch(
          `http://localhost:8081/api/meetinglist/${userId}`
        );
        if (!meetingsResponse.ok) {
          throw new Error(`HTTP error! status: ${meetingsResponse.status}`);
        }
        const meetingsData = await meetingsResponse.json();
        setMeetings(meetingsData);

        // Fetch payment data
        const paymentsResponse = await fetch(
          `http://localhost:8081/api/payment/${userId}`
        );
        if (!paymentsResponse.ok) {
          throw new Error(`HTTP error! status: ${paymentsResponse.status}`);
        }
        const paymentsData = await paymentsResponse.json();
        setPayments(paymentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  function updateActiveTab(tab) {
    setActive(tab);
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  const profile_url =
    userData.profile_url ||
    "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg";

  const { user, followers, following, connector, connectee } = userData;
  const { name, username, email, mobile_number, created_at, updated_at } = user;

  return (
    <>
      <NavBar />
      <div className="flex">
        <Sidebar />
        <div className="w-full p-8">
          <div className="w-full flex gap-8 items-center">
            <img
              src={profile_url}
              alt={username}
              className="w-52 rounded-full h-52"
            />
            <UserDetails
              props={{
                name: name || "not provided",
                userId: username,
                email: email || "Not provided",
                mobile: mobile_number || "Not provided",
                createdAt: created_at,
                updatedAt: updated_at,
                followers: followers,
                following: following,
                connector: connector,
                connectee: connectee,
              }}
            />
          </div>
          <div className="flex justify-evenly mt-5 w-full bg-indigo-200 mx-auto rounded-xl shadow-xl border-b-4 border-blue-400 overflow-hidden">
            <div
              className={`p-4 text-xl w-full text-center ${
                activeTab !== "connectionStatus"
                  ? "hover:cursor-pointer hover:bg-indigo-400"
                  : "bg-white"
              }`}
              onClick={() => updateActiveTab("connectionStatus")}
            >
              Connection Status
            </div>
            <div
              className={`p-4 text-xl w-full text-center ${
                activeTab !== "followersStatus"
                  ? "hover:cursor-pointer hover:bg-indigo-400"
                  : "bg-white"
              }`}
              onClick={() => updateActiveTab("followersStatus")}
            >
              Followers Status
            </div>
            <div
              className={`p-4 text-xl w-full text-center ${
                activeTab !== "meetingSchedule"
                  ? "hover:cursor-pointer hover:bg-indigo-400"
                  : "bg-white"
              }`}
              onClick={() => updateActiveTab("meetingSchedule")}
            >
              Meeting Schedule
            </div>
            <div
              className={`p-4 text-xl w-full text-center ${
                activeTab !== "schedulePayment"
                  ? "hover:cursor-pointer hover:bg-indigo-400"
                  : "bg-white"
              }`}
              onClick={() => updateActiveTab("schedulePayment")}
            >
              Schedule Payment
            </div>
          </div>
          {activeTab === "connectionStatus" && connectionStatus && (
            <ConnectionStatusTab
              connectionsCount={connectionStatus.sentRequests}
              connecteesCount={connectionStatus.receivedRequests}
            />
          )}
          {activeTab === "followersStatus" && followersStatus && (
            <FollowersTab
              sentRequests={followersStatus.sentRequests}
              receivedRequests={followersStatus.receivedRequests}
            />
          )}
          {activeTab === "meetingSchedule" && (
            <MeetingTab meetings={meetings} />
          )}
          {activeTab === "schedulePayment" && (
            <PaymentTab payments={payments} />
          )}{" "}
          {/* Pass payments data */}
        </div>
      </div>
    </>
  );
};

export default Profile;
