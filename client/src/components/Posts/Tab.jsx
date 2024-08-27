import React from 'react'

const Tab = ({list}) => {
  return (
    <>
    <div className="w-full">
    {list.map((item, index) => (
          <div className={`flex p-4 gap-4 items-center m-2 rounded-lg ${
            index % 2 === 0 ? "bg-blue-200" : "bg-blue-100"
          }`}key={index}>
            {item.icon && <img
              src={item.icon}
              alt="profile_icon"
              className="w-10 h-10 rounded-full"
            />}
            <div className="flex flex-col">
              <p className="text-base font-semibold">{item.title}</p>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        ))}
    </div>
    </>
  )
}

export default Tab