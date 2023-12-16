// components/ChatComponent.tsx
'use client'
import React, { useEffect, useState, useRef } from 'react'
import { useAuth } from '../contexts/authContext'
import { sendMessage, onMessageUpdate } from '../db/config/firestoreService'
import Image from 'next/image'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'

type Message = {
  id: string
  name: string
  text: string
  uid: string
  email: string
  photoURL: string
  createdAt: string
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const { currentUser } = useAuth()
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const unsubscribe = onMessageUpdate((newMessages) => {
      setMessages(newMessages)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    // Scroll to the bottom of the messages container whenever the messages update
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages])

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        await sendMessage({
          text: newMessage,
          uid: currentUser?.uid || 'unknown',
          email: currentUser?.email || 'unknown',
          name: currentUser?.email?.split('@')[0] || 'unknown',
          photoURL: currentUser?.photoURL || 'default-photo-url',
          createdAt: new Date().toISOString(),
        })
        setNewMessage('')
      } catch (error) {
        console.error('Error sending message:', error)
      }
    }
  }

  const isCurrentUser = (messageUid: string) => currentUser?.uid === messageUid

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Chat messages display */}
      <div
        ref={messagesContainerRef}
        className="flex flex-col gap-2 p-4 overflow-y-auto h-[85vh] bg-white rounded-lg shadow"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              isCurrentUser(message.uid) ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`flex items-start gap-2 ${
                isCurrentUser(message.uid) ? 'flex-row-reverse' : ''
              }`}
            >
              <Image
                src={message.photoURL}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full border border-gray-200"
              />
              <div
                className={`flex flex-col ${
                  isCurrentUser(message.uid) ? 'items-end' : ''
                }`}
              >
                {!isCurrentUser(message.uid) && (
                  <span className="text-sm font-semibold text-gray-700">
                    {message.name}
                  </span>
                )}
                <p
                  className={`p-2 rounded-lg ${
                    isCurrentUser(message.uid)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  {message.text}
                </p>
                <span className="text-xs text-gray-400">
                  {message.createdAt}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message input */}
      <div className="mt-auto p-4 bg-white rounded-lg shadow">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 text-white"
          >
            <PaperAirplaneIcon className="h-5 w-5 transform rotate-90" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatComponent
