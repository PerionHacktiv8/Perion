// src/contexts/authContext.tsx
'use client'
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { authN } from '../db/config/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'

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

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authN, (user) => {
      setCurrentUser(
        user
          ? { uid: user.uid, email: user.email, photoURL: user.photoURL }
          : null,
      )
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
