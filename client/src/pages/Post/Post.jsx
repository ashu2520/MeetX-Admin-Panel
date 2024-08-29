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
          <div className="flex gap-4 bg-white shadow-lg p-4 rounded-lg items-start">
            <div className="aspect-square w-3/5 flex items-center justify-center bg-black rounded-md">
            <img
              src="https://www.datocms-assets.com/46272/1633199491-1633199490440.jpg?auto=format&fit=max&w=1200"
              className="w-full"
              alt=""
            />
            </div>
            <div className="flex flex-col gap-4 text-3xl w-2/5">
              <div className="flex gap-4 text-lg items-center">
                <img src="https://digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png" alt="UserIcon" className="w-10 aspect-square rounded-full"/>
                <span>Username</span>
              </div>
              <p className="text-lg h-44 overflow-y-scroll">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi dicta illo earum praesentium harum error consequuntur necessitatibus voluptatum incidunt aliquid cumque, natus aspernatur eos totam, iste esse libero officia qui quos doloremque. Dicta accusamus non asperiores fugiat perferendis pariatur magni temporibus quam? Sapiente quaerat a accusantium voluptates, nostrum eos quasi.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi dicta illo earum praesentium harum error consequuntur necessitatibus voluptatum incidunt aliquid cumque, natus aspernatur eos totam, iste esse libero officia qui quos doloremque. Dicta accusamus non asperiores fugiat perferendis pariatur magni temporibus quam? Sapiente quaerat a accusantium voluptates, nostrum eos quasi.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi dicta illo earum praesentium harum error consequuntur necessitatibus voluptatum incidunt aliquid cumque, natus aspernatur eos totam, iste esse libero officia qui quos doloremque. Dicta accusamus non asperiores fugiat perferendis pariatur magni temporibus quam? Sapiente quaerat a accusantium voluptates, nostrum eos quasi.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi dicta illo earum praesentium harum error consequuntur necessitatibus voluptatum incidunt aliquid cumque, natus aspernatur eos totam, iste esse libero officia qui quos doloremque. Dicta accusamus non asperiores fugiat perferendis pariatur magni temporibus quam? Sapiente quaerat a accusantium voluptates, nostrum eos quasi.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi dicta illo earum praesentium harum error consequuntur necessitatibus voluptatum incidunt aliquid cumque, natus aspernatur eos totam, iste esse libero officia qui quos doloremque. Dicta accusamus non asperiores fugiat perferendis pariatur magni temporibus quam? Sapiente quaerat a accusantium voluptates, nostrum eos quasi.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi dicta illo earum praesentium harum error consequuntur necessitatibus voluptatum incidunt aliquid cumque, natus aspernatur eos totam, iste esse libero officia qui quos doloremque. Dicta accusamus non asperiores fugiat perferendis pariatur magni temporibus quam? Sapiente quaerat a accusantium voluptates, nostrum eos quasi.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi dicta illo earum praesentium harum error consequuntur necessitatibus voluptatum incidunt aliquid cumque, natus aspernatur eos totam, iste esse libero officia qui quos doloremque. Dicta accusamus non asperiores fugiat perferendis pariatur magni temporibus quam? Sapiente quaerat a accusantium voluptates, nostrum eos quasi.</p>              
          
           <div className="flex justify-evenly w-full bg-indigo-200 mx-auto rounded-xl shadow-xl border-b-4 border-blue-400 overflow-hidden">
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
            <div
              className={`p-4 text-xl w-full text-center ${
                activeTab !== "saves"
                  ? "hover:cursor-pointer hover:bg-indigo-400"
                  : "bg-white"
              }`}
              onClick={() => updateActiveTab("saves")}
            >
              Saves
            </div>
          </div>
          <div className="w-full overflow-y-scroll max-h-[450px]">
          {activeTab === "likes" && <Tab list={likes}/>}
          
          {activeTab === "comments" && <Tab list={comments} />}
          {activeTab === "shares" && <Tab list={shares}/>}
        {activeTab === "tags" && <Tab list={tags}/>}
        </div>

          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
