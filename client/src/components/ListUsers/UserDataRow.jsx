import React from "react";
import ActionButton from "./ActionButton";

const UserDataRow = ({ index, userId, Name, Email, Mobile, type, createdAt }) => {
  return (
    <div className='bg-white border flex shadow-md connectionRequest-UserDataRow'>
      <div className='border w-1/6 p-2'>{index}</div>
      <div className='border w-1/6 p-2'>{userId}</div>
      <div className='border w-1/6 p-2'>{Name}</div>
      <div className='border w-2/6 p-2'>{Email}</div>
      <div className='border w-1/6 p-2'>{Mobile}</div>
      <div className='border w-1/6 p-2'>{type}</div>
      <div className='border w-1/6 p-2'>{createdAt}</div>
      <div className='border w-1/6 p-2'>
        <ActionButton userId={userId} />
      </div>
    </div>
  );
};

export default UserDataRow;
