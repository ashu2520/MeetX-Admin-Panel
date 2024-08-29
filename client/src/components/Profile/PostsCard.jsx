import React, { useState } from "react";
import heartIcon from "../../assets/icons/like.svg";
import commentIcon from "../../assets/icons/comments.svg";
import shareIcon from "../../assets/icons/share.svg";
import tagIcon from "../../assets/icons/tags.svg";
import PostsSubTab from "./PostsSubTab";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const PostsCard = ({
  imgSrc,
  date,
  caption,
  likes,
  comments,
  tags,
  shares,
  subposts = [],
}) => {
  // const [isZoomed, setIsZoomed] = useState(false);
  const [subTab, setSubTab] = useState(null);

  // const handleZoomToggle = () => {
  //   if (isZoomed) {
  //     setSubTab(null);
  //     document.body.style.overflow = "auto";
  //   } else {
  //     document.body.style.overflowX = "hidden";
  //   }
  //   setIsZoomed(!isZoomed);
  // };

  return (
    <>
      <div
        className="w-full aspect-video bg-cover bg-center hover:scale-105 hover:cursor-pointer hover:shadow-2xl duration-500"
        style={{ backgroundImage: `url(${imgSrc})` }}
        // onClick={handleZoomToggle}
      ></div>
      {/* {isZoomed && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-[#00000091] z-40 flex pt-10 flex-col items-center">
          <div className="relative bg-white w-[800px] opacity-100 p-2 gap-2 h-fit z-50">
            <div
              className="absolute top-2 right-2 bg-black w-8 h-8 text-white rounded-full flex items-center justify-center hover:scale-125 hover:cursor-pointer duration-300 z-50"
              // onClick={handleZoomToggle}
            >
              X
            </div>

            
            {subposts.length > 0 ? (
              <Carousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                containerClass="carousel-container"
                dotListClass="dot-list"
                draggable
                focusOnSelect={false}
                infinite
                itemClass="carousel-item"
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderButtonGroupOutside
                renderDotsOutside={false}
                responsive={{
                  desktop: {
                    breakpoint: { max: 3000, min: 1024 },
                    items: 1,
                    partialVisibilityGutter: 40,
                  },
                  mobile: {
                    breakpoint: { max: 464, min: 0 },
                    items: 1,
                    partialVisibilityGutter: 30,
                  },
                  tablet: {
                    breakpoint: { max: 1024, min: 464 },
                    items: 1,
                    partialVisibilityGutter: 30,
                  },
                }}
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
                customLeftArrow={
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 cursor-pointer bg-gray-800 text-white rounded-full hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <MdArrowBack size={30} />
                  </div>
                }
                customRightArrow={
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 cursor-pointer bg-gray-800 text-white rounded-full hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <MdArrowForward size={30} />
                  </div>
                }
              >
                <div
                  className="w-full aspect-video bg-cover bg-center"
                  style={{ backgroundImage: `url(${imgSrc})` }}
                ></div>
                
                {subposts.map((subpost, index) => (
                  <div
                    key={index}
                    className="w-full aspect-video bg-cover bg-center"
                    style={{ backgroundImage: `url(${subpost.img})` }}
                  ></div>
                ))}
              </Carousel>
            ) : (
              // Display only the main image if there are no subposts
              <div
                className="w-full aspect-video bg-cover bg-center"
                style={{ backgroundImage: `url(${imgSrc})` }}
              ></div>
            )}

            <p className="text-sm p-4">{caption}</p>
            <div className="flex justify-between p-4">
              <div className="text-base">{date}</div>
              <div className="flex gap-4">
                <div
                  className={`flex gap-2 text-base items-center p-2 rounded-md ${
                    subTab === "likes" ? "bg-blue-400" : "bg-white"
                  }`}
                  onClick={() => setSubTab("likes")}
                >
                  <img src={heartIcon} alt="icon" />
                  {likes.length}
                </div>
                <div
                  className={`flex gap-2 text-base items-center p-2 rounded-md ${
                    subTab === "comments" ? "bg-blue-400" : "bg-white"
                  }`}
                  onClick={() => setSubTab("comments")}
                >
                  <img src={commentIcon} alt="icon" />
                  {comments.length}
                </div>
                <div
                  className={`flex gap-2 text-base items-center p-2 rounded-md ${
                    subTab === "shares" ? "bg-blue-400" : "bg-white"
                  }`}
                  onClick={() => setSubTab("shares")}
                >
                  <img src={shareIcon} alt="icon" />
                  {shares.length}
                </div>
                <div
                  className={`flex gap-2 text-base items-center p-2 rounded-md ${
                    subTab === "tags" ? "bg-blue-400" : "bg-white"
                  }`}
                  onClick={() => setSubTab("tags")}
                >
                  <img src={tagIcon} alt="icon" />
                  {tags.length}
                </div>
              </div>
            </div>
            {subTab === "likes" && <PostsSubTab list={likes} />}
            {subTab === "comments" && <PostsSubTab list={comments} />}
            {subTab === "shares" && <PostsSubTab list={shares} />}
            {subTab === "tags" && <PostsSubTab list={tags} />}
          </div>
        </div>
      )} */}
    </>
  );
};

export default PostsCard;
