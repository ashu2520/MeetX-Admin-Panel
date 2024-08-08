import React from 'react'
import UserIcon from "../../assets/icons/Users.svg";
function DashCard({title, number}) {
  return (
    <>
    <div className='bg-white relative rounded-lg border p-2 w-full'>
        <div className="absolute rounded-md border bg-white h-8 w-8 -top-2 flex justify-center items-center">
            <img src={UserIcon} alt="" />
        </div>
        <div className="grid grid-cols-2">
            <div>
                {/* Empty Div */}
            </div>
            <div className='flex flex-col gap-2 text-right'>
                <span className='text-[10px]'>{title || "Sample Text"}</span>
                <span className='font-semibold'>{number || "007"}</span>
            </div>
        </div>
    </div>
    </>
  )
}

export default DashCard