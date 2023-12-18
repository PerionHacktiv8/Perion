'use client'
import React, { useState, useEffect } from 'react'
import {
  createOrJoinRoom,
  sendMessage,
  onRoomUpdate,
} from './../db/config/firestoreService'

const ChatRoomList = ({ onSelectRoom }) => {
  // Mock data for rooms, you can replace it with dynamic data from Firestore
  const rooms = [{ id: 'room1' }, { id: 'room2' }]

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-lg font-bold mb-2">Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.id} className="mb-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => onSelectRoom(room.id)}
            >
              {room.id}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const MessageList = ({ messages }) => (
  <ul className="overflow-auto h-96 bg-white shadow rounded p-4">
    {messages.map((message, index) => (
      <li key={index} className="mb-2">
        <span className="text-sm font-semibold">{message.userId}:</span>
        <span className="text-sm ml-2">{message.text}</span>
      </li>
    ))}
  </ul>
)

const MessageInput = ({ onSendMessage }) => {
  const [text, setText] = useState('')

  const handleSend = () => {
    onSendMessage(text)
    setText('')
  }

  return (
    <div className="flex items-center justify-between p-2 bg-white shadow rounded">
      <input
        type="text"
        placeholder="Type a message"
        className="border border-gray-300 p-2 rounded flex-grow mr-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  )
}

const ChatApp = () => {
  const [currentRoom, setCurrentRoom] = useState(null)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (currentRoom) {
      const unsubscribe = onRoomUpdate(currentRoom, setMessages)
      return unsubscribe
    }
  }, [currentRoom])

  const handleRoomSelect = (roomId) => {
    setCurrentRoom(roomId)
    createOrJoinRoom(roomId)
  }

  const handleSendMessage = (text) => {
    if (text.trim()) {
      sendMessage(currentRoom, 'userId', text) // Replace 'userId' with actual user ID
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <ChatRoomList onSelectRoom={handleRoomSelect} />
        </div>
        <div className="col-span-2">
          {currentRoom && (
            <>
              <MessageList messages={messages} />
              <MessageInput onSendMessage={handleSendMessage} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatApp
