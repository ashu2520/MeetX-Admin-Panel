import React, { act, useState } from "react";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import Tab from "../../components/Posts/Tab";
import { likes } from "./likes";
import { comments } from "./comments";
import { shares } from "./shares";
import { tags } from "./tags";

const Post = () => {
  const [activeTab, setActiveTab] = useState(null);

  const updateActiveTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <NavBar />
      <div className="flex">
        <Sidebar />
        <div className="w-full p-8">
          <div className="flex gap-10">
            <img
              src="https://www.datocms-assets.com/46272/1633199491-1633199490440.jpg?auto=format&fit=max&w=1200"
              className="w-3/4"
              alt=""
            />
            <div className="flex flex-col gap-2 text-3xl">
              <div>
                <strong>Likes :</strong> 12
              </div>
              <div>
                <strong>Comments :</strong> 12
              </div>
              <div>
                <strong>Shares :</strong> 12
              </div>
              <div>
                <strong>Tags :</strong> 12
              </div>
            </div>
          </div>
          <div className="flex justify-evenly mt-5 w-full bg-indigo-200 mx-auto rounded-xl shadow-xl border-b-4 border-blue-400 overflow-hidden">
            <div
              className={`p-4 text-xl w-full text-center ${
                activeTab !== "likes"
                  ? "hover:cursor-pointer hover:bg-indigo-400"
                  : "bg-white"
              }`}
              onClick={() => updateActiveTab("likes")}
            >
              Likes
            </div>
            <div
              className={`p-4 text-xl w-full text-center ${
                activeTab !== "comments"
                  ? "hover:cursor-pointer hover:bg-indigo-400"
                  : "bg-white"
              }`}
              onClick={() => updateActiveTab("comments")}
            >
              Comments
            </div>
            <div
              className={`p-4 text-xl w-full text-center ${
                activeTab !== "shares"
                  ? "hover:cursor-pointer hover:bg-indigo-400"
                  : "bg-white"
              }`}
              onClick={() => updateActiveTab("shares")}
            >
              Shares
            </div>
            <div
              className={`p-4 text-xl w-full text-center ${
                activeTab !== "tags"
                  ? "hover:cursor-pointer hover:bg-indigo-400"
                  : "bg-white"
              }`}
              onClick={() => updateActiveTab("tags")}
            >
              Tags
            </div>
          </div>
          {activeTab === "likes" && <Tab list={likes}/>}
          {activeTab === "comments" && <Tab list={comments} />}
          {activeTab === "shares" && <Tab list={shares}/>}
          {activeTab === "tags" && <Tab list={tags}/>}
        </div>
      </div>
    </>
  );
};

export default Post;
