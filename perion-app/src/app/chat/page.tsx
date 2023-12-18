// src/app/chat/page.tsx
import React from 'react'
import ChatComponent from '../../components/ChatComponent'
import { AuthProvider } from '../../contexts/authContext'

const ChatPage = () => {
  return (
    <AuthProvider>
      <ChatComponent />
    </AuthProvider>
  )
}

export default ChatPage
