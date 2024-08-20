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
  const [activeTab, setActive] = useState("connectionStatus"); // Default active tab
  const [userData, setUserData] = useState(null);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");

  useEffect(() => {
    if (!userId) {
      console.error("User ID is missing in query parameters.");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/profile/${userId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  function updateActiveTab(tab) {
    setActive(tab);
  }

  const profile_url =
    "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg";

  if (!userData) {
    return <div>Loading...</div>;
  }

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
          {activeTab === "connectionStatus" && (
            <ConnectionStatusTab
              connectionsCount={connector}
              connecteesCount={connectee}
            />
          )}
          {activeTab === "followersStatus" && (
            <FollowersTab
              followersCount={followers}
              followingCount={following}
            />
          )}
          {activeTab === "meetingSchedule" && <MeetingTab />}
          {activeTab === "schedulePayment" && <PaymentTab />}
        </div>
      </div>
    </>
  );
};

export default Profile;
