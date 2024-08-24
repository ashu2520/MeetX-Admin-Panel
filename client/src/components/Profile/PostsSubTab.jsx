import React from "react";

const PostsSubTab = ({list}) => {
  return (
    <>
      <div className="max-w-[400px] w-fit min-h-fit ml-[400px] mt-2 bg-white overflow-y-scroll max-h-52 rounded-lg">
        {list.map((item, index) => (
          <div className="flex p-4 gap-4 items-center" key={index}>
            {item.icon && <img
              src={item.icon}
              alt="profile_icon"
              className="w-8 h-8 rounded-full"
            />}
            <div className="flex flex-col">
              <p className="text-base font-semibold">{item.title}</p>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostsSubTab;
