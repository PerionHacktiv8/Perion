import React from "react";

const ChatHistory = [
  { name: "UI/UX", lastMessage: "Last message preview...", unread: 2 },
  { name: "Back-end dev.", lastMessage: "Last message preview...", unread: 0 },
];
const Sidebar = () => {
  return (
    <div className="bg-gray-200 text-gray-800 w-80 py-2 overflow-y-auto max-h-screen">
      <div className="px-4 mb-4">
        {" "}
        <h2 className="text-2xl font-extrabold text-gray-800">Parion ID</h2>
      </div>
      {ChatHistory.map((chat, index) => (
        <div
          key={index}
          className={`flex items-center px-4 py-2 ${
            chat.unread ? "bg-gray-200" : ""
          } hover:bg-gray-500 cursor-pointer`}
        >
          <div className="flex-grow">
            <h3 className="font-bold">{chat.name}</h3>
            <p className="text-gray-400 text-sm">{chat.lastMessage}</p>
          </div>
          {chat.unread ? (
            <span className="text-xs text-blue-500">{chat.unread}</span>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
