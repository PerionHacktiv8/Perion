'use client'

import { FunctionComponent } from 'react'
import Image from 'next/image'
import {
  Card,
  Typography,
  Button,
  Input,
  IconButton,
} from '@material-tailwind/react'
import { signInWithGoogle } from '../../db/config/Sign-InFunction'
import { signInWithGithub } from '../../db/config/Sign-InFunction'
import { signInWithFacebook } from '../../db/config/Sign-InFunction'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const RegisterPage: FunctionComponent = () => {
  const router = useRouter()
  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle()
      router.push('/')
    } catch (error) {
      console.error('Error signing in with Google:', error)
    }
  }

  const handleSignInWithGithub = async () => {
    try {
      await signInWithGithub()
      router.push('/')
    } catch (error) {
      console.error('Error signing in with GitHub:', error)
    }
  }

  const handleSignInWithFacebook = async () => {
    try {
      await signInWithFacebook()
      router.push('/')
    } catch (error) {
      console.error('Error signing in with Facebook:', error)
    }
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
          objectFit="contain"
        />
        <h1 className="text-5xl text-white font-bold lg:ml-4">Parion</h1>
      </div>
      {/* Card for sign up */}
      <div className="flex w-full lg:w-1/3 items-center justify-center p-4">
        <Card
          placeholder={''}
          shadow={false}
          className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto py-8 px-4 sm:px-12"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-4xl text-black font-bold">Sign Up</h2>
            <Link href="/" className="flex items-center">
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
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-gray-900">
              Sign In
            </Link>
          </p>
          <div className="flex justify-start gap-3 mt-5">
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
          <form className="mt-5 mb-2 w-full">
            <div className="mb-1 flex flex-col gap-4">
              <p className="text-black text-lg -mb-3">Your Name</p>
              <Input
                crossOrigin={''}
                placeholder="name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              <p className="text-lg text-black -mb-3">Your Username</p>
              <Input
                crossOrigin={''}
                placeholder="username"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              <p className="text-lg text-black -mb-3">Your Email</p>
              <Input
                crossOrigin={''}
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              <p className="text-lg text-black -mb-3">Password</p>
              <Input
                crossOrigin={''}
                type="password"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </div>
            <Button placeholder={''} className="mt-6" fullWidth>
              sign up
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default RegisterPage
