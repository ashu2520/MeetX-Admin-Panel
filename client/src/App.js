import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import ListUsers from "./pages/List Users/ListUsers";
import Dashboard from "./pages/Dashboard/Dashboard";
import ManageTemplates from "./pages/ManageTemplates/ManageTemplates";
import EditTemplate from "./pages/EditTemplate/EditTemplate";
import ChangePassword from "./pages/ChangePassword/ChangePassword";

import ConnectionRequests from "./pages/ConnectionRequests/ConnectionRequests";
import ReportedPosts from "./pages/ReportedPost/ReportedPost";
import Profile from "./pages/Profile/Profile";
import WalletHistory from "./pages/WalletHistory/WalletHistory";
import MeetingList from "./pages/MeetingList/MeetingList"
import Employee from "./pages/Employee/Employee";
import Withdraw from "./pages/WithdrawList/WithdrawList";
import ManageTestimonials from "./pages/ManageTestimonials/ManageTestimonials";
import Settings from "./pages/Settings/Settings";
import FollowersList from "./pages/FollowersList/FollowersLists";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<ListUsers />} />
        <Route path="/users/profile" element={<Profile/>}/>
        <Route path="/employees" element={<Employee/>} />
        <Route path="/meeting-list" element={<MeetingList/>}/>
        
        <Route path="/reported-post" element={<ReportedPosts/>}/>
        <Route path="/change-password" element={<ChangePassword/>} />
        <Route path="/manage-templates" element={<ManageTemplates/>} />
        <Route path="/edit-template" element={<EditTemplate/>} />
        <Route path="manage-testimonials" element={<ManageTestimonials/>}/>
        <Route path="/connection-requests" element={<ConnectionRequests/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/withdraw-list" element={<WalletHistory/>}/>
        <Route path="/followerlist"  element={<FollowersList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;