import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import DashCard from "../../components/Dashboard/DashCard";
import PieChart from "../../components/Dashboard/PieChart";
import LineChart from "../../components/Dashboard/LineChart";
import Sidebar from "../../components/Sidebar";
// import DashCalendarCard from "../../components/Dashboard/DashCalendarCard";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8081/api/dashboard",{
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
        setDashboardData(data);
      })
      .catch((err) => {
        setError("There was an error fetching the data: " + err.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  const skillsPieChartData = dashboardData.skill_names.map((name, index) => ({
    name: name,
    y: dashboardData.skill_user_counts[index],
  }));
  // console.log("PieChartData:", skillsPieChartData);
  const interestPieChartData = dashboardData.category_names.map(
    (name, index) => ({
      name: name,
      y: dashboardData.category_percentages[index],
    })
  );
  // console.log("PieChartData:", interestPieChartData);
  const LineChartData = [
    {
      name: "Videos",
      data: dashboardData.videos_count,
    },
    {
      name: "Photos",
      data: dashboardData.photos_count,
    },
  ];

  return (
    <>
      <NavBar />
      <div className="w-full flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <div className="grid grid-cols-7 gap-2 p-2 pt-4 w-full">
            <DashCard title="Total Users" number={dashboardData.total_users} />
            <DashCard
              title="Users Today"
              number={dashboardData.total_users_today}
            />
            <DashCard title="Total Posts" number={dashboardData.total_posts} />
            <DashCard
              title="Today's Posts"
              number={dashboardData.total_posts_today}
            />
            <DashCard
              title="Complete Profiles"
              number={dashboardData.complete_profiles}
            />
            <DashCard
              title="Incomplete Profiles"
              number={dashboardData.incomplete_profiles}
            />
            <DashCard 
              title="Total Engagement" 
              number={dashboardData.total_engagement} 
            />
            <DashCard
              title="Schedule Meetings"
              number= '0'
            />
            <DashCard
              title="Pending Connections"
              number={dashboardData.pending_count}
            />
            <DashCard
              title="Accepted Connections"
              number={dashboardData.accepted_count}
            />
            <DashCard
              title="Rejected Connections"
              number={dashboardData.rejected_count}
            />
            <DashCard
              title="Reported Posts"
              number={dashboardData.reported_posts_count}
            />
            <DashCard
              title="Reported Users"
              number={dashboardData.reported_users_count}
            />
          </div>
          <div className="grid grid-cols-2 w-full p-2">
            <PieChart
              containerId={"skillsContainer"}
              title={"Skills"}
              subtitle={"Skills of Users"}
              animationDuration={2000}
              data={skillsPieChartData}
            />
            <PieChart
              containerId={"categoriesContainer"}
              title={"Categories"}
              subtitle={"User Interests"}
              animationDuration={2000}
              data={interestPieChartData}
            />
          </div>
          <div className="w-full p-2">
            <LineChart
              containerId={"lineChartContainer"}
              title={"Images V/s Videos"}
              subtitle={"Images and videos uploaded by users"}
              seriesData={LineChartData}
              xAxisDescription={"Dates"}
              yAxisTitle={"Images V/s Videos"}
              startDate={"2024-04-03"}
              endDate={"2024-07-20"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
