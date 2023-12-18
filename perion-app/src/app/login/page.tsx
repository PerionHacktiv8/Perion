'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, Button, Input, IconButton } from '@material-tailwind/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  signInWithFacebook,
  signInWithGithub,
  signInWithGoogle,
} from './action'
import { ResponseAPIType } from '../api/user/route'

const LoginPage = () => {
  const router = useRouter()
  const [showPass, setShowPass] = useState(false)
  const [logData, setLogData] = useState({
    email: '',
    password: '',
  })

  const handleSignInWithGoogle = async () => {
    const res = await signInWithGoogle()

    if (res.message === 'success') {
      router.push('/')
    }

    if (res.message !== 'success') console.log(res)
  }

  const handleSignInWithGithub = async () => {
    const res = await signInWithGithub()

    if (res.message === 'success') {
      router.push('/')
    }

    if (res.message !== 'success') console.log(res)
  }

  const handleSignInWithFacebook = async () => {
    const res = await signInWithFacebook()

    if (res.message === 'success') {
      router.push('/')
    }

    if (res.message !== 'success') console.log(res)
  }

  const doLogin = async () => {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(logData),
    })

    const resJson = (await res.json()) as ResponseAPIType<string>

    if (resJson && resJson.statusCode === 200) {
      router.push('/')
    }

    if (resJson && resJson.statusCode === 400) console.log(resJson)
  }

  return (
    <div className="flex flex-col bg-[url(https://static.vecteezy.com/system/resources/previews/032/976/063/non_2x/artificial-intelligence-tech-background-digital-technology-deep-learning-and-big-data-concept-ai-generated-free-photo.jpg)] lg:flex-row justify-around items-center bg-cover w-full min-h-screen">
      {/* Logo and Text */}
      <div className="z-10 flex w-full lg:flex-row lg:w-1/3 items-center justify-center lg:justify-center bg-opacity-60 lg:bg-transparent p-8 text-center lg:text-left">
        <Image
          src="https://ik.imagekit.io/naufalrafi/Parion%20Logo%20(1).png?updatedAt=1702368775661"
          alt="Company Logo"
          width={100}
          height={100}
        />
        <h1 className="text-5xl text-white font-bold lg:ml-4">Parion</h1>
      </div>
      {/* Card for sign in */}
      <div className="flex w-full lg:w-1/3 items-center justify-center p-4">
        <Card
          placeholder={''}
          shadow={false}
          className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto py-8 px-4 sm:px-12"
        >
          <div className="flex justify-between">
            <p className="text-4xl text-black font-bold">Sign in</p>
            <Link
              href="/"
              className="flex items-center hover:text-black transition-all duration-200"
            >
              <IconButton
                placeholder={''}
                variant="text"
                className="rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </IconButton>
              Back To Home
            </Link>
          </div>
          <p color="gray" className="mt-2 font-normal">
            Dont have an account?{' '}
            <Link href="/register" className="font-bold text-gray-900">
              Sign Up
            </Link>
          </p>
          <div className="flex justify-start gap-4 mt-5">
            <Button
              placeholder={''}
              color="white"
              variant="outlined"
              className="border-2 h-fit w-fit border-gray-300 rounded-full p-3"
              onClick={() => handleSignInWithGoogle()}
            >
              <Image
                src="https://docs.material-tailwind.com/icons/google.svg"
                alt="Sign up with Google"
                width={18}
                height={18}
              />
            </Button>
            <Button
              placeholder={''}
              color="white"
              variant="outlined"
              className="border-2 h-fit w-fit border-gray-300 rounded-full p-3"
              onClick={() => handleSignInWithGithub()}
            >
              <Image
                src="https://cdns.iconmonstr.com/wp-content/releases/preview/2012/240/iconmonstr-github-1.png"
                alt="Sign up with Github"
                width={18}
                height={18}
              />
            </Button>
            <Button
              placeholder={''}
              color="white"
              variant="outlined"
              className="border-2 h-fit w-fit border-gray-300 rounded-full p-3"
              onClick={() => handleSignInWithFacebook()}
            >
              <Image
                src="https://www.vectorlogo.zone/logos/facebook/facebook-icon.svg"
                alt="Sign up with Facebook"
                width={18}
                height={18}
              />
            </Button>
          </div>
          <form action={doLogin} className="mt-5 mb-2 w-full">
            <div className="mb-1 flex flex-col gap-4">
              <p className="text-black text-lg -mb-3">Your Email</p>
              <Input
                crossOrigin={''}
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
                name="email"
                value={logData.email}
                onChange={(e) => {
                  setLogData({ ...logData, email: e.target.value })
                }}
              />
              <p className="text-black text-lg -mb-3">Password</p>
              <Input
                crossOrigin={''}
                type={showPass ? 'text' : 'password'}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 items-center"
                    onClick={() => {
                      setShowPass(!showPass)
                    }}
                  >
                    {showPass ? (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </>
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    )}
                  </svg>
                }
                placeholder="•••••••"
                className=" !border-t-blue-gray-200 items-center focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
                name="password"
                value={logData.password}
                onChange={(e) => {
                  setLogData({ ...logData, password: e.target.value })
                }}
              />
            </div>
            <Button type="submit" placeholder={''} className="mt-6" fullWidth>
              sign in
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage
