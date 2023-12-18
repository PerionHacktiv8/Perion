'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/authContext'
import {
  createRoom,
  sendMessage,
  onRoomUpdate,
  onMessageUpdate,
  getUserProfiles,
  Room,
  Message,
  UserProfile,
} from '../db/config/firestoreService'
import Image from 'next/image'

const ChatComponent: React.FC = () => {
  const [currentRoom, setCurrentRoom] = useState<string | null>(null)
  const [rooms, setRooms] = useState<Room[]>([])
  const [roomUserProfiles, setRoomUserProfiles] = useState<
    Record<string, UserProfile[]>
  >({})
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState<string>('')
  const { currentUser } = useAuth()
  const bottomListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentUser && currentUser.uid === 'userId1') {
      const unsubscribe = onRoomUpdate(
        currentUser.uid,
        async (updatedRooms) => {
          setRooms(updatedRooms)

          // Check if userId1 is in any room
          const isUserInRoom = updatedRooms.some((room) =>
            room.userIds.includes(currentUser.uid),
          )

          if (!isUserInRoom) {
            // No rooms available for userId1, create or join one
            let newRoomId =
              updatedRooms.length > 0 ? updatedRooms[0].id : await createRoom()
            setCurrentRoom(newRoomId)
          } else if (!currentRoom) {
            // Auto-connect to the first room if already a member
            setCurrentRoom(updatedRooms[0].id)
          }
        },
      )
      return () => unsubscribe()
    }
  }, [currentUser, currentRoom])

  useEffect(() => {
    if (currentRoom) {
      const unsubscribe = onMessageUpdate(currentRoom, setMessages)
      return () => unsubscribe()
    }
  }, [currentRoom])

  useEffect(() => {
    const fetchUserProfiles = async () => {
      const profilesByRoom: Record<string, UserProfile[]> = {}
      for (const room of rooms) {
        const profiles = (await getUserProfiles(room.userIds)).filter(
          (profile) => profile !== null, // This filter ensures that only non-null profiles are included
        ) as UserProfile[]
        profilesByRoom[room.id] = profiles
      }
      setRoomUserProfiles(profilesByRoom)
    }

    if (rooms.length > 0) {
      fetchUserProfiles()
    }
  }, [rooms])

  const handleSendMessage = async () => {
    if (newMessage.trim() && currentUser && currentRoom) {
      await sendMessage(
        currentRoom,
        currentUser.uid,
        newMessage,
        currentUser.email || 'unknown',
        currentUser.photoURL || '/default-profile.jpg',
      )
      setNewMessage('')
      bottomListRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleRoomSelection = async (roomId: string) => {
    setCurrentRoom(roomId)
  }

  const handleCreateRoom = async () => {
    try {
      const newRoomId = await createRoom()
      setCurrentRoom(newRoomId)
    } catch (error) {
      console.error('Error while creating room:', error)
    }
  }

  return (
    <div className="flex h-screen">
      <aside className="w-1/4 bg-gray-100 p-4 overflow-auto">
        {/* ... Room list rendering */}
        {rooms.map((room) => (
          <div
            key={room.id}
            onClick={() => handleRoomSelection(room.id)}
            className={`flex items-center p-3 hover:bg-gray-200 rounded-lg cursor-pointer ${
              room.id === currentRoom ? 'bg-gray-300' : ''
            }`}
          >
            <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {room.id.slice(0, 2).toUpperCase()}
            </div>
            <div className="ml-4">
              <p className="text-sm font-semibold text-gray-700">
                Room {room.id}
              </p>
              {roomUserProfiles[room.id] && (
                <p className="text-xs text-gray-500">
                  {roomUserProfiles[room.id]
                    .map((user) => user.email.split('@')[0])
                    .join(', ')}
                </p>
              )}
            </div>
          </div>
        ))}
        <button
          className="mt-4 bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2 w-full"
          onClick={handleCreateRoom}
        >
          Create Room
        </button>
      </aside>

      <main className="w-3/4 flex flex-col bg-white">
        <div className="flex-grow p-4 overflow-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${
                message.userId === currentUser?.uid ? 'justify-end' : ''
              }`}
            >
              <div
                className={`flex items-end gap-2 ${
                  message.userId === currentUser?.uid ? 'flex-row-reverse' : ''
                }`}
              >
                <Image
                  src={message.photoURL || '/default-profile.jpg'}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div
                  className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                    message.userId === currentUser?.uid
                      ? 'bg-green-100 text-gray-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className="block text-sm font-semibold mb-1">
                    {message.email.split('@')[0]}
                  </span>
                  <span className="block text-xs text-gray-600 mb-1">
                    {new Date(message.createdAt).toLocaleString()}
                  </span>
                  {message.text}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomListRef} />
        </div>

        <div className="p-4 bg-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow p-2 border border-gray-300 rounded focus:outline-none"
            />
            <button
              className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ChatComponent
