import React from 'react'
import Chat from '../../components/ChatComponent'
import { AuthProvider } from '../../contexts/authContext'

const Page = () => {
  return (
    <AuthProvider>
      {' '}
      {/* Wrap the AuthProvider around the component */}
      <div className="flex flex-col min-h-screen">
        <Chat />
      </div>
    </AuthProvider>
  )
}

export default Page
