import React from "react";
import postsIcon from "../../assets/icons/posts.svg";
import { Dropdown } from "./Dropdown";

const UserDetails = ({props}) => {

  return (
    <div className="grid grid-flow-row w-full p-4 gap-4">
      <div className="w-full grid grid-cols-3">
        <div className="text-slate-900 text-2xl">{props.name}</div>
        <div className="text-slate-900 text-2xl">{props.userId}</div>
      </div>
      <div className="w-full grid grid-cols-3 text-lg">
        <div className="text-lg">
          Email: <span className="text-blue-700">{props.email}</span>
        </div>
        <div className="text-lg">
          Mobile Number: <span className="text-blue-700">{props.mobile}</span>
        </div>
        <div className="flex gap-3 items-start">
          Posts: <img src={postsIcon} alt="Icon" className="w-6 mt-1" />
        </div>
      </div>
      <div className="grid grid-cols-2 w-full gap-x-10">
        <div className="w-full border-r-2 border-slate-500 grid grid-cols-2">
            <div className="flex flex-col">
                <div className="text-2xl font-semibold">{props.connector}</div>
                <div className="text-lg">Connector</div>
            </div>
            <div className="flex flex-col">
                <div className="text-2xl font-semibold">{props.connectee}</div>
                <div className="text-lg">Connectee</div>
            </div>
        </div>
        <div className="w-full grid grid-cols-2">
            <div className="flex flex-col">
                <div className="text-2xl font-semibold">{props.followers}</div>
                <div className="text-lg">Followers</div>
            </div>
            <div className="flex flex-col">
                <div className="text-2xl font-semibold">{props.following}</div>
                <div className="text-lg">Following</div>
            </div>
        </div>
      </div>
        {/* <div className="flex gap-4">
            <Dropdown name={"Skills"} options={["App Development", "UI/UX Design", "Mobile App Testing", "API Integration"]} />
            <Dropdown name={"Interests"} options={["App Development", "UI/UX Design", "Mobile App Testing", "API Integration"]} />
        </div> */}
    </div>
  );
};

export default UserDetails;
