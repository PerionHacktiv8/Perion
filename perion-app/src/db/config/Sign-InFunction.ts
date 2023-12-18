import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signInWithRedirect,
} from 'firebase/auth'
import { authN } from './firebaseConfig'
import { redirect } from 'next/navigation'

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

    const response = await fetch('http://localhost:3000/api/auth', {
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

    console.log(response);


    const responseJson: MyResponse<unknown> = await response.json();

    console.log(responseJson)

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

    const response = await fetch('http://localhost:3000/api/auth', {
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

      return redirect(`/error?message=${message}`);
    }

    return responseJson;

  } catch (error) {
    console.error('Error during Github Sign-In:', error);
    throw error;
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

    const response = await fetch('http://localhost:3000/api/auth', {
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

<<<<<<< HEAD
    console.log(response);


    const responseJson: MyResponse<unknown> = await response.json();

    console.log(responseJson.data);


    if (!response.ok) {
      let message = responseJson.error ?? "Something went wrong!";

      return redirect(`/error?message=${message}`);
    }

    return responseJson;
  } catch (error) {
    console.error('Error during Google Sign-In:', error);
    throw error;
=======
    const responseJson: MyResponse<unknown> = await response.json()

    if (!response.ok) {
      let message = responseJson.error ?? 'Something went wrong!'

      return redirect(`/error?message=${message}`)
>>>>>>> 4fd30bf3daa1d783a5a32a18b5fcf3497ff78a5e
  }

  return responseJson
} catch (error) {
  console.error('Error during Google Sign-In:', error)
  throw error
}
}
