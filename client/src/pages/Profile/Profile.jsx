import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import UserDetails from "../../components/Profile/UserDetails";
import ConnectionStatusTab from "../../components/Profile/ConnectionStatusTab";
import FollowersTab from "../../components/Profile/FollowersTab";
import MeetingTab from "../../components/Profile/MeetingTab";
import PaymentTab from "../../components/Profile/PaymentTab";

const Profile = () => {
  const { userId } = useParams();  // Get userId from URL params
  const [userData, setUserData] = useState(null);
  const [activeTab, setActive] = useState(null);

  useEffect(() => {
    // Fetch user data from the backend
    fetch(`http://localhost:8081/api/userProfile/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  function updateActiveTab(tab) {
    setActive(tab);
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  const profile_url = userData.profile_url || "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg";

  return (
    <>
      <NavBar />
      <div className="flex">
        <Sidebar />
        <div className="w-full p-8">
          <div className="w-full flex gap-8 items-center">
            <img
              src={profile_url}
              alt={userData.name}
              className="w-52 rounded-full h-52"
            />
            <UserDetails props={userData} />
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
          {activeTab === "connectionStatus" && <ConnectionStatusTab />}
          {activeTab === "followersStatus" && <FollowersTab />}
          {activeTab === "meetingSchedule" && <MeetingTab />}
          {activeTab === "schedulePayment" && <PaymentTab />}
        </div>
      </div>
    </>
  );
};

export default Profile;
