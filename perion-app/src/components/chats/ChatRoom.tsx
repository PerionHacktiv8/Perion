// chats/ChatRoom.tsx
'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react'
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
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const ChatComponent: React.FC = () => {
  const [currentRoom, setCurrentRoom] = useState<string | null>(null)
  const [rooms, setRooms] = useState<Room[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState<string>('')
  const [roomName, setRoomName] = useState<string>('')
  const [typing, setTyping] = useState<Record<string, boolean>>({})
  const user = authN.currentUser // this is auth firebase
  const [mongoObjectId, setMongoObjectId] = useState<string | null>(null)
  const messagesEndRef = useRef(null)
  const [selectedUser, setSelectedUser] = useState<string>('')

  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = subscribeToRoomMessages(user.uid, handleNewMessage)
      return () => unsubscribe()
    }
  }, [user?.uid])

  useEffect(() => {
    // Retrieve the MongoDB ObjectId from cookies
    const objectId = Cookies.get('token')
    if (objectId) {
      console.log('MongoDB ObjectId:', objectId) // Debug log
      setMongoObjectId(objectId)
    }
  }, [])

  useEffect(() => {
    if (user?.uid) {
      getChatRooms(user.uid).then(setRooms)
    }
  }, [user?.uid])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handlePrivateChatCreation = async () => {
    if (selectedUser && user?.uid) {
      const roomId = await createOrJoinPrivateRoom(user.uid, selectedUser)
      setCurrentRoom(roomId)
    }
  }

  const handleNewMessage = (message: Message, roomId: string) => {
    // Notification logic here
    const isTyping = typing[roomId]
    if (message.userId !== user?.uid && !isTyping) {
      console.log('New message:', message) // Debug log
    }

    // Update messages state
    setMessages((messages) => [...messages, message])
  }

  useEffect(() => {
    if (user?.uid) {
      getChatRooms(user.uid).then((fetchedRooms) => {
        setRooms(fetchedRooms)
        fetchedRooms.forEach((room) => {
          subscribeToRoomMessages(room.id, handleNewMessage)
        })
      })
    }
  }, [user?.uid])

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
    // Use MongoDB ObjectId if available, else fall back to Firebase UID
    const userId = mongoObjectId || user?.uid
    if (newMessage.trim() && currentRoom && userId) {
      await postMessage(currentRoom, userId, newMessage)
      setNewMessage('')
    }
  }, [newMessage, currentRoom, mongoObjectId, user?.uid])

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
    <div className="flex flex-col h-screen">
      {' '}
      {/* Full viewport height */}
      <header className="bg-gray-800 p-4 flex justify-between items-center text-white">
        <div className="flex items-center">
          <span className="ml-2">{user?.displayName}</span>
        </div>
      </header>
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {' '}
        {/* Flex container for sidebar and chat area */}
        <aside className="w-1/4 bg-gray-900 overflow-y-auto">
          {' '}
          {/* Sidebar with fixed width */}
          {/* Add h-full */}
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
        {/* Chat Area */}
        <main className="flex-1 flex flex-col bg-gray-200">
          {' '}
          {/* Chat area taking the remaining width */}
          {/* Chat messages area */}
          <div className="flex-1 overflow-y-auto">
            {' '}
            {/* Messages should scroll within this container */}
            {/* Room Creation Input */}
            {!currentRoom && (
              <div className="p-4">
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
            {/* Messages Display */}
            <div className="flex-1 flex flex-col overflow-y-auto p-4 space-y-4">
              {/* Messages will start from the top and stack downwards */}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.userId === user?.uid
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded ${
                      message.userId === user?.uid
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-800'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            {/* Message Input */}
            {currentRoom && (
              <div className="border-t border-gray-300 p-4">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={newMessage}
                  onChange={handleTyping}
                  onKeyDown={handleKeyDown}
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={handleSendMessage}
                >
                  Send
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default ChatComponent
