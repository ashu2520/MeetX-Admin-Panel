import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
// import UserDetails from "../../components/Profile/UserDetails";
import ConnectionStatusTab from "../../components/Profile/ConnectionStatusTab";
import FollowersTab from "../../components/Profile/FollowersTab";
import MeetingTab from "../../components/Profile/MeetingTab";
import PaymentTab from "../../components/Profile/PaymentTab";
import postsIcon from "../../assets/icons/posts.svg";
import videoIcon from "../../assets/icons/video.svg";
import PostsTab from "../../components/Profile/PostsTab";
import { postsList } from "./data";

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
          `http://localhost:8081/api/profile/${userId}`,{
            headers:{
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
          }
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

  if (!userData) {
    return <div>Loading...</div>;
  }

  const profile_url =
    userData.profile_url ||
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
            <div className="grid grid-flow-row w-full p-4 gap-4">
      <div className="w-full grid grid-cols-3">
        <div className="text-slate-900 text-2xl">{name}</div>
        <div className="text-slate-900 text-2xl">{username}</div>
      </div>
      <div className="w-full gap-10 flex text-lg items-center">
        <div className="text-lg">
          Email: <span className="text-blue-700">{email}</span>
        </div>
        <div className="text-lg">
          Mobile Number: <span className="text-blue-700">{mobile_number}</span>
        </div>
        <div className={`flex gap-3 p-2 items-start hover:cursor-pointer rounded-md ${activeTab==="posts"?"bg-blue-400":"bg-transparent"}`} onClick={() => updateActiveTab("posts")}>
          Posts: <img src={postsIcon} alt="Icon" className="w-6 mt-1" />
        </div>
        <div className={`flex gap-3 p-2 items-start hover:cursor-pointer rounded-md ${activeTab==="videos"?"bg-blue-400":"bg-transparent"}`} onClick={() => updateActiveTab("videos")}>
          Videos: <img src={videoIcon} alt="Icon" className="w-6 mt-1" />
        </div>
      </div>
      <div className="grid grid-cols-2 w-full gap-x-10">
        <div className="w-full border-r-2 border-slate-500 grid grid-cols-2">
            <div className="flex flex-col">
                <div className="text-2xl font-semibold">{connector}</div>
                <div className="text-lg">Connector</div>
            </div>
            <div className="flex flex-col">
                <div className="text-2xl font-semibold">{connectee}</div>
                <div className="text-lg">Connectee</div>
            </div>
        </div>
        <div className="w-full grid grid-cols-2">
            <div className="flex flex-col">
                <div className="text-2xl font-semibold">{followers}</div>
                <div className="text-lg">Followers</div>
            </div>
            <div className="flex flex-col">
                <div className="text-2xl font-semibold">{following}</div>
                <div className="text-lg">Following</div>
            </div>
        </div>
      </div>
      </div>
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
          {activeTab === "posts" && <PostsTab posts={postsList}/>}
          {activeTab === "videos" && <PostsTab posts={postsList}/>}
        </div>
      </div>
    </>
  );
};

export default Profile;
