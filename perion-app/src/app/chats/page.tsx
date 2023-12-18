'use client'

import ChatComponent from '../../components/ChatComponent'
import { AuthProvider } from '../../contexts/authContext'

export default function Profile() {
  return (
    <div className="flex justify-center">
      <AuthProvider>
        <ChatComponent />
      </AuthProvider>
    </div>
  )
}
