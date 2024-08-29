import React, { useState } from "react";
import heartIcon from "../../assets/icons/like.svg";
import commentIcon from "../../assets/icons/comments.svg";
import shareIcon from "../../assets/icons/share.svg";
import tagIcon from "../../assets/icons/tags.svg";
import PostsSubTab from "./PostsSubTab";

const PostsCard = ({
  imgSrc,
  date,
  likes,
  comments,
  tags,
  shares,
  caption,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [subTab, setSubTab] = useState(null);

  const Likedlist = [
    {
      icon: "https://example.com/icons/icon1.png",
      title: "Profile Overview",
      description: "View and manage your profile settings and preferences.",
    },
    {
      icon: "https://example.com/icons/icon2.png",
      title: "Notifications",
      description: "Manage notification settings and preferences.",
    },
    {
      icon: "https://example.com/icons/icon3.png",
      title: "Security",
      description: "Update security settings and check recent activity.",
    },
    {
      icon: "https://example.com/icons/icon4.png",
      title: "Billing",
      description: "Manage your billing information and subscription plan.",
    },
  ];

  return (
    <>
      <div
        className="w-full aspect-square bg-cover bg-center hover:scale-105 hover:cursor-pointer hover:shadow-2xl duration-500"
        style={{ backgroundImage: `url(${imgSrc})` }}
        onClick={() => {
          setIsZoomed(true);
          document.body.style.overflowX = "hidden";
        }}
      ></div>
      {isZoomed && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-[#00000091] z-40 flex pt-10 flex-col items-center">
          <div className="relative bg-white w-[800px] opacity-100 p-2 gap-2 h-fit z-50">
            <div
              className="bg-black absolute w-8 h-8 right-2 text-white rounded-full flex items-center justify-center hover:scale-125 hover:cursor-pointer duration-300"
              onClick={() => {
                setIsZoomed(false);
                document.body.style.overflow = "auto";
              }}
            >
              X
            </div>
            <img src={imgSrc} alt="postImage" className="w-full aspect-video" />
            <p className="text-sm p-4">{caption}</p>
            <div className="flex justify-between p-4">
              <div className="text-base">{date}</div>
              <div className="flex gap-4">
                <div className={`flex gap-2 text-base items-center  p-2 rounded-md ${subTab==="likes"?"bg-blue-400":"bg-white"}`} onClick={()=>setSubTab("likes")}>
                  <img src={heartIcon} alt="icon" />
                  {likes.length}
                </div>
                <div className={`flex gap-2 text-base items-center  p-2 rounded-md ${subTab==="comments"?"bg-blue-400":"bg-white"}`} onClick={()=>setSubTab("comments")}>
                  <img src={commentIcon} alt="icon" />
                  {comments.length}
                </div>
                <div className={`flex gap-2 text-base items-center  p-2 rounded-md ${subTab==="shares"?"bg-blue-400":"bg-white"}`} onClick={()=>setSubTab("shares")}>
                  <img src={shareIcon} alt="icon" />
                  {shares.length}
                </div>
                <div className={`flex gap-2 text-base items-center  p-2 rounded-md ${subTab==="tags"?"bg-blue-400":"bg-white"}`} onClick={()=>setSubTab("tags")}>
                  <img src={tagIcon} alt="icon" />
                  {tags.length}
                </div>
              </div>
            </div>
          </div>
          {subTab === "likes" && <PostsSubTab list={likes} />}
          {subTab === "comments" && <PostsSubTab list={comments} />}
          {subTab === "shares" && <PostsSubTab list={shares} />}
          {subTab === "tags" && <PostsSubTab list={tags} />}
        </div>
      )}
    </>
  );
};

export default PostsCard;
