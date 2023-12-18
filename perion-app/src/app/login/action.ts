import { authN } from '@/db/config/firebaseConfig'
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth'
import { redirect } from 'next/navigation'
import { data } from '../api/login/route'

type MyResponse<T> = {
  statusCode: number
  message: string
  data?: T
  error?: string
}

export const signInWithFacebook = async () => {
  try {
    const provider = new FacebookAuthProvider()
    const result = await signInWithPopup(authN, provider)
    const user = result.user

    const token = await user.getIdToken()

    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: user.email,
        uid: user.uid,
      }),
    })

    const responseJson: MyResponse<data> = await response.json()

    if (!response.ok) {
      let message = responseJson.error ?? 'Something went wrong!'

      return redirect(`/error?message=${message}`)
    }

    return responseJson
  } catch (error) {
    console.error('Error during Facebook Sign-In:', error)
    throw error
  }
}

export const signInWithGithub = async () => {
  try {
    const provider = new GithubAuthProvider()
    const result = await signInWithPopup(authN, provider)
    const user = result.user

    const token = await user.getIdToken()

    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: user.email,
        uid: user.uid,
      }),
    })

    const responseJson: MyResponse<unknown> = await response.json()

    if (!response.ok) {
      let message = responseJson.error ?? 'Something went wrong!'

      return redirect(`/error?message=${message}`)
    }

    return responseJson
  } catch (error) {
    console.error('Error during Github Sign-In:', error)
    throw error
  }
}

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(authN, provider)
    const user = result.user

    const token = await user.getIdToken()

    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: user.email,
        uid: user.uid,
      }),
    })

    const responseJson: MyResponse<data> = await response.json()

    if (responseJson.statusCode === 401) {
      return responseJson
    }

    return responseJson
  } catch (error) {
    console.error('Error during Google Sign-In:', error)
    throw error
  }
}
