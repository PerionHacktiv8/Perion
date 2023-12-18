'use client'
import React, { useState } from 'react';
import { Avatar, Button } from '@material-tailwind/react';

export function ChatRoom() {

    const [isChatRoomOpen, setIsChatRoomOpen] = useState(true); 

    const toggleChatRoom = () => {
        setIsChatRoomOpen(!isChatRoomOpen);
    };

    const chatEntries = [
        {
            name: "Ryann Remo",
            message: "Yea, Sure!",
            date: "15 April",
            status: "online",
            unreadMessages: 23,
        },
    ];

    return (
        <div>
            <div className="flex h-full bg-white">
                {isChatRoomOpen && (
                <div className="container m-auto w-11/12 flex flex-col">
                    <div className="py-4 flex flex-row">
                        <div className="flex-1">
                        <span className="xl:hidden inline-block text-gray-700 hover:text-gray-900 align-bottom">
                                <span className="block h-6 w-6 p-1 rounded-full hover:bg-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                </span>
                            </span>
                            <span className="lg:hidden inline-block ml-8 text-gray-700 hover:text-gray-900 align-bottom">
                                <span className="block h-6 w-6 p-1 rounded-full hover:bg-gray-400">
                                    <svg className="h-4 w-4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-1">
                        <div className="hidden lg:flex w-1/3 flex-col pr-6">
                            {/* Search bar */}
                            <div className="flex-2 pb-6 px-2">
                                <input type="text" className="outline-none py-2 block w-full bg-transparent border-b-2 border-gray-200" placeholder="Search" />
                            </div>
                            {/* Chat entries */}
                            <div className="flex-1 h-full overflow-auto px-2">
                                {chatEntries.map((entry, index) => (
                                    <div key={index} className="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md">
                                        <div className="flex-2">
                                            <div className="w-12 h-12 relative">
                                                <Avatar placeholder={""} src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
                                                <span className={`absolute w-4 h-4 rounded-full right-0 bottom-0 border-2 border-white ${entry.status === 'online' ? 'bg-green-400' : 'bg-gray-400'}`}></span>
                                            </div>
                                        </div>
                                        <div className="flex-1 px-2">
                                            <div className="truncate w-32"><span className="text-gray-800">{entry.name}</span></div>
                                            <div><small className="text-gray-600">{entry.message}</small></div>
                                        </div>
                                        <div className="flex-2 text-right">
                                            <div><small className="text-gray-500">{entry.date}</small></div>
                                            {/* Display unread messages if any */}
                                            {entry.unreadMessages > 0 && (
                                                <div>
                                                    <small className="text-xs bg-red-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block">
                                                        {entry.unreadMessages}
                                                    </small>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="chat-area flex-1 flex flex-col">
                            <div className="flex-3">
                                <h2 className="text-xl py-1 mb-8 border-b-2 border-gray-200">Chatting with <b>Mercedes Yemelyan</b></h2>
                            </div>
                            <div className="messages flex-1 overflow-auto">
                            <div className="message mb-4 flex">
                                        <div className="flex-2">
                                            <div className="w-12 h-12 relative">
                                            <Avatar placeholder={""} src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
                                                <span className="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                                            </div>
                                        </div>
                                        <div className="flex-1 px-2">
                                            <div className="inline-block bg-gray-300 rounded-full p-2 px-6 text-gray-700">
                                                <span>Hey there. We would like to invite you over to our office for a visit. How about it?</span>
                                            </div>
                                            <div className="pl-4"><small className="text-gray-500">15 April</small></div>
                                        </div>
                                    </div>
                                    <div className="message mb-4 flex">
                                        <div className="flex-2">
                                            <div className="w-12 h-12 relative">
                                                <Avatar placeholder={""} src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
                                                <span className="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                                            </div>
                                        </div>
                                        <div className="flex-1 px-2">
                                            <div className="inline-block bg-gray-300 rounded-full p-2 px-6 text-gray-700">
                                                <span>All travel expenses are covered by us of course :D</span>
                                            </div>
                                            <div className="pl-4"><small className="text-gray-500">15 April</small></div>
                                        </div>
                                    </div>
                                    <div className="message me mb-4 flex text-right">
                                        <div className="flex-1 px-2">
                                            <div className="inline-block bg-blue-600 rounded-full p-2 px-6 text-white">
                                                <span>Its like a dream come true</span>
                                            </div>
                                            <div className="pr-4"><small className="text-gray-500">15 April</small></div>
                                        </div>
                                    </div>
                                    <div className="message me mb-4 flex text-right">
                                        <div className="flex-1 px-2">
                                            <div className="inline-block bg-blue-600 rounded-full p-2 px-6 text-white">
                                                <span>I accept. Thank you very much.</span>
                                            </div>
                                            <div className="pr-4"><small className="text-gray-500">15 April</small></div>
                                        </div>
                                    </div>
                                    <div className="message mb-4 flex">
                                        <div className="flex-2">
                                            <div className="w-12 h-12 relative">
                                                <Avatar placeholder={""} src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
                                                <span className="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                                            </div>
                                        </div>
                                        <div className="flex-1 px-2">
                                            <div className="inline-block bg-gray-300 rounded-full p-2 px-6 text-gray-700">
                                                <span>You are welome. We will stay in touch.</span>
                                            </div>
                                            <div className="pl-4"><small className="text-gray-500">15 April</small></div>
                                        </div>
                                    </div>
                            </div>
                            <div className="flex-2 pt-4 pb-10">
                            <div className="write bg-white shadow flex rounded-lg">
                                        <div className="flex-3 flex content-center items-center text-center p-4 pr-0">
                                            <span className="block text-center text-gray-400 hover:text-gray-800">
                                                <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" className="h-6 w-6"><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <textarea name="message" className="w-full block outline-none py-4 px-4 bg-transparent grid grid-rows-1" placeholder="Type a message..."></textarea>
                                        </div>
                                        <div className="flex-2 w-32 p-2 flex content-center items-center">
                                            <div className="flex-1 text-center">
                                                <span className="text-gray-400 hover:text-gray-800">
                                                    <span className="inline-block align-text-bottom">
                                                        <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <button className="bg-blue-400 w-10 h-10 rounded-full inline-block">
                                                    <span className="inline-block align-text-bottom">
                                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" className="w-4 h-4 text-white"><path d="M5 13l4 4L19 7"></path></svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
            {/* Collapsible button
            <div className="p-4 flex justify-end">
                <Button
                    placeholder={""}
                    color="light-blue"
                    onClick={toggleChatRoom}
                >
                    {isChatRoomOpen ? 'Hide Chat Room' : 'Show Chat Room'}
                </Button>
            </div> */}
        </div>
    );
}

