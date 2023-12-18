'use client'
import React, { useState } from 'react'
import { Avatar, Button, IconButton, Textarea } from '@material-tailwind/react'
import Link from 'next/link'

export function ChatRoom() {
  const [isChatRoomOpen, setIsChatRoomOpen] = useState(true)

  const toggleChatRoom = () => {
    setIsChatRoomOpen(!isChatRoomOpen)
  }

  const chatEntries = [
    {
      name: 'Ryann Remo',
      message: 'Yea, Sure!',
      date: '15 April',
      status: 'online',
      unreadMessages: 23,
    },
  ]

  return (
    <div className="w-full h-screen p-10">
      <div className="w-full h-full bg-white rounded-lg">
        {isChatRoomOpen && (
          <div className="w-full h-full flex flex-col pl-4">
            <div className="py-4 flex flex-row">
              <div className="flex-1">
                <span className="xl:hidden inline-block text-gray-700 hover:text-gray-900 align-bottom">
                  <span className="block h-6 w-6 p-1 rounded-full hover:bg-gray-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                  </span>
                </span>
                <span className="lg:hidden inline-block ml-8 text-gray-700 hover:text-gray-900 align-bottom">
                  <span className="block h-6 w-6 p-1 rounded-full hover:bg-gray-400">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </span>
                </span>
              </div>
            </div>

            <div className="flex flex-1">
              <div className="hidden lg:flex w-1/3 flex-col pr-6">
                {/* Search bar */}
                <div className="flex items-center pb-6 px-2">
                  <Link href="/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                      />
                    </svg>
                  </Link>
                  <input
                    type="text"
                    className="outline-none py-2 block w-full bg-transparent border-b-2 border-gray-200 ml-2"
                    placeholder="Search"
                  />
                </div>
                {/* Chat entries */}
                <div className="flex-1 h-full overflow-auto px-2">
                  {chatEntries.map((entry, index) => (
                    <div
                      key={index}
                      className="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md"
                    >
                      <div className="flex-2">
                        <div className="w-12 h-12 relative">
                          <Avatar
                            placeholder={''}
                            src="https://docs.material-tailwind.com/img/face-2.jpg"
                            alt="avatar"
                          />
                        </div>
                      </div>
                      <div className="flex-1 px-2">
                        <div className="truncate w-32">
                          <span className="text-gray-800">{entry.name}</span>
                        </div>
                        <div>
                          <small className="text-gray-600">
                            {entry.message}
                          </small>
                        </div>
                      </div>
                      <div className="flex-2 text-right">
                        <div>
                          <small className="text-gray-500">{entry.date}</small>
                        </div>
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
              {/* Chat area */}
              <div className="w-full flex flex-col">
                <div className="flex items-center gap-4">
                  <Avatar
                    placeholder={''}
                    src="https://docs.material-tailwind.com/img/face-2.jpg"
                    alt="avatar"
                  />
                  <h2 className="text-xl py-1">
                    <p className="text-black font-semibold">Naufal Rafi</p>
                  </h2>
                </div>
                <div className="border-t-2 border-gray-200 my-3"></div>
                <div className="messages flex-1 overflow-auto">
                  <div className="message mb-4 flex">
                    <div className="flex-2">
                      <div className="w-12 h-12 relative">
                        <Avatar
                          placeholder={''}
                          src="https://docs.material-tailwind.com/img/face-2.jpg"
                          alt="avatar"
                        />
                      </div>
                    </div>
                    <div className="flex-1 px-2">
                      <div className="inline-block bg-gray-300 rounded-full p-2 px-6 text-gray-700">
                        <span>
                          Hey there. We would like to invite you over to our
                          office for a visit. How about it?
                        </span>
                      </div>
                      <div className="pl-4">
                        <small className="text-gray-500">15 April</small>
                      </div>
                    </div>
                  </div>
                  <div className="message me mb-4 flex text-right">
                    <div className="flex-1 px-2">
                      <div className="inline-block bg-blue-600 rounded-full p-2 px-6 text-white">
                        <span>Its like a dream come true</span>
                      </div>
                      <div className="pr-4">
                        <small className="text-gray-500">15 April</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-2 pt-4 pb-10 mr-4">
                  <div className="flex w-full flex-row items-center gap-2 rounded-md border border-gray-900/10 bg-whit4e p-2">
                    <Textarea
                      rows={1}
                      placeholder="Your Message"
                      className="min-h-full !border-0 focus:border-transparent"
                      containerProps={{
                        className: 'grid h-full',
                      }}
                      labelProps={{
                        className: 'before:content-none after:content-none',
                      }}
                    />
                    <div>
                      <IconButton
                        placeholder={''}
                        variant="text"
                        className="rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                          />
                        </svg>
                      </IconButton>
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
  )
}
