// contexts/authContext.tsx
'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../db/config/firebaseConfig'

type AuthUser = {
  uid: string
  email: string | null
  photoURL: string | null
}

type AuthContextType = {
  currentUser: AuthUser | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(
        user
          ? { uid: user.uid, email: user.email, photoURL: user.photoURL }
          : null,
      )
      setLoading(false)
    })
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
