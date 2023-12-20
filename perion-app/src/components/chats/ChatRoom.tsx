'use client'
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  MutableRefObject,
} from 'react'
import {
  getChatRooms,
  postMessage,
  subscribeToChat,
  Room,
  Message,
  setTypingStatus,
  subscribeToTyping,
  subscribeToRoomMessages,
  addUserToRoom,
  getUserDetails,
} from '../../db/config/firestoreService'
import { authN } from '../../db/config/firebaseConfig'

interface UserDetails {
  [key: string]: {
    displayName: string
    photoURL: string
  }
}

const ChatComponent: React.FC = () => {
  // State and variables
  const [currentRoom, setCurrentRoom] = useState<string | null>(null)
  const [rooms, setRooms] = useState<Room[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState<string>('')
  const [typing, setTyping] = useState<Record<string, boolean>>({})
  const user = authN.currentUser
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const [userDetails, setUserDetails] = useState<UserDetails>({})

  // Functions
  const fetchUserDetails = async (uid: string) => {
    if (!userDetails[uid]) {
      const details = await getUserDetails(uid)
      setUserDetails((prev) => ({ ...prev, [uid]: details }))
    }
  }

  // useEffect(() => {
  //   messages.forEach((message) => {
  //     fetchUserDetails(message.userId)
  //   })
  // }, [messages])

  // useEffect(() => {
  //   if (user?.uid) {
  //     const unsubscribe = subscribeToRoomMessages(user.uid, handleNewMessage)
  //     return () => unsubscribe()
  //   }
  // }, [user?.uid])

  useEffect(() => {
    if (user?.uid) {
      getChatRooms(user.uid).then(setRooms)
    }
  }, [user?.uid])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleNewMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message])
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
      // const unsubscribeTyping = subscribeToTyping(currentRoom, setTyping)
      return () => {
        // unsubscribe()
        // unsubscribeTyping()
      }
    }
  }, [currentRoom])

  const handleSendMessage = useCallback(async () => {
    const userId = user?.uid
    if (newMessage.trim() && currentRoom && userId) {
      await postMessage(currentRoom, userId, newMessage)
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

  // JSX for the ChatComponent
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gray-800 p-4 flex justify-between items-center mt-16 text-white">
        <div className="flex items-center">
          <span className="ml-2">{user?.displayName}</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Room Creation */}

        {/* Room List */}
        <aside className="w-1/4 bg-gray-900 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4 text-white">
            Your Messages
          </h2>
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
          <div className="flex flex-col gap-4 p-2 h-full overflow-y-auto">
            {/* Chat Messages with User Display Names */}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.userId === user?.uid ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded ${
                    message.userId === user?.uid
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-gray-800'
                  }`}
                >
                  {/* {message.userId !== user?.uid && (
                    <div className="text-xs mb-1">
                      {userDetails[message.userId]?.displayName}
                    </div>
                  )} */}
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
        </main>
      </div>
    </div>
  )
}

export default ChatComponent
