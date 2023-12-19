'use client'
import React, { useState, useEffect, useCallback } from 'react'
import {
  getChatRooms,
  postMessage,
  subscribeToChat,
  createOrJoinRoom,
  Room,
  Message,
  setTypingStatus,
  subscribeToTyping,
  subscribeToRoomMessages,
} from '../../db/config/firestoreService'
import { authN } from '../../db/config/firebaseConfig'
import Image from 'next/image'

const ChatComponent: React.FC = () => {
  const [currentRoom, setCurrentRoom] = useState<string | null>(null)
  const [rooms, setRooms] = useState<Room[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState<string>('')
  const [roomName, setRoomName] = useState<string>('')
  const [typing, setTyping] = useState<Record<string, boolean>>({})
  const user = authN.currentUser

  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = subscribeToRoomMessages(user.uid, handleNewMessage)
      return () => unsubscribe()
    }
  }, [user?.uid])

  useEffect(() => {
    const savedRoomId = localStorage.getItem('currentRoom')
    if (savedRoomId) {
      setCurrentRoom(savedRoomId)
    }
  }, [])

  const handleNewMessage = useCallback(
    (message: Message, roomId: string) => {
      if (roomId === currentRoom) {
        setMessages((prevMessages) => [...prevMessages, message])
      }
    },
    [currentRoom],
  )

  useEffect(() => {
    if (currentRoom) {
      setMessages([])
      const unsubscribe = subscribeToChat(currentRoom, setMessages)
      const unsubscribeTyping = subscribeToTyping(currentRoom, setTyping)
      return () => {
        unsubscribe()
        unsubscribeTyping()
      }
    }
  }, [currentRoom])

  const handleSendMessage = useCallback(async () => {
    if (newMessage.trim() && currentRoom && user?.uid) {
      await postMessage(currentRoom, user.uid, newMessage)
      setNewMessage('')
    }
  }, [newMessage, currentRoom, user?.uid])

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentRoom) {
      e.preventDefault()
      await handleSendMessage()
    }
  }

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value)
    if (currentRoom && user?.uid) {
      setTypingStatus(currentRoom, user.uid, e.target.value !== '')
    }
  }

  const handleRoomCreation = async () => {
    if (roomName.trim() && user?.uid) {
      const roomId = await createOrJoinRoom(roomName, user.uid)
      setCurrentRoom(roomId)
      setRoomName('')
      getChatRooms(user.uid).then(setRooms)
    }
  }

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-full max-w-4xl mx-auto shadow-lg">
        <header className="bg-gray-800 p-4 flex justify-between items-center text-white">
          <div className="flex items-center">
            <Image
              src={user?.photoURL || '/images/default-avatar.png'}
              alt="avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="ml-4 font-semibold">{user?.displayName}</span>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 font-semibold py-2 px-4 rounded"
            onClick={() => authN.signOut()}
          >
            Logout
          </button>
        </header>

        <div className="flex-grow flex">
          <aside className="w-1/4 bg-gray-900 p-4 border-r">
            <h2 className="text-lg font-semibold mb-4 text-white">Rooms</h2>
            <ul className="overflow-auto">
              {rooms.map((room) => (
                <li
                  key={room.id}
                  className={`p-3 hover:bg-gray-700 cursor-pointer ${
                    currentRoom === room.id
                      ? 'bg-gray-700 text-white font-semibold'
                      : 'text-gray-400'
                  }`}
                  onClick={() => setCurrentRoom(room.id)}
                >
                  {room.name}
                  <span className="text-xs text-gray-500">
                    {' '}
                    ({room.userIds.length})
                  </span>
                </li>
              ))}
            </ul>
          </aside>

          <main className="flex-grow p-4 bg-gray-200">
            <div className="h-full flex flex-col">
              {!currentRoom && (
                <div className="p-4">
                  {/* Room creation input and button */}
                  <input
                    type="text"
                    placeholder="Room name"
                    className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                  />
                  <button
                    className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={handleRoomCreation}
                  >
                    Create/Join Room
                  </button>
                </div>
              )}

              <div className="flex-grow overflow-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex flex-col ${
                      message.userId === user?.uid
                        ? 'items-end text-right'
                        : 'items-start text-left'
                    }`}
                  >
                    <span className="text-xs text-gray-500">
                      {message.userId === user?.displayName}
                    </span>
                    <div
                      className={`rounded-lg p-2 mt-1 ${
                        message.userId === user?.uid
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-300'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
              {currentRoom && (
                <div className="mt-4 border-t pt-4">
                  <input
                    type="text"
                    placeholder="Type a message"
                    className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                    value={newMessage}
                    onChange={handleTyping}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default ChatComponent
