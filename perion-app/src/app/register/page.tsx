'use client'
import { useState, FunctionComponent } from 'react'
import Image from 'next/image'
import {
  Card,
  Typography,
  Button,
  Input,
  IconButton,
} from '@material-tailwind/react'
import { signInWithGoogle } from "../../db/config/Sign-InFunction";
import { signInWithGithub } from "../../db/config/Sign-InFunction";
import { signInWithFacebook } from "../../db/config/Sign-InFunction";
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const LoginPage: FunctionComponent = () => {
  const router = useRouter()
  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
      router.push('/');
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSignInWithGithub = async () => {
    try {
      await signInWithGithub();
      router.push('/');
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
    }
  };

  const handleSignInWithFacebook = async () => {
    try {
      await signInWithFacebook();
      router.push('/');
    } catch (error) {
      console.error("Error signing in with Facebook:", error);
    }
  };

  return (
    <div className="relative flex flex-col lg:flex-row justify-center items-center bg-cover w-full min-h-screen">
      <Image
        src="https://static.vecteezy.com/system/resources/previews/032/976/063/non_2x/artificial-intelligence-tech-background-digital-technology-deep-learning-and-big-data-concept-ai-generated-free-photo.jpg"
        layout="fill"
        objectFit="cover"
        quality={100}
        alt="Background"
        className="brightness-50"
      />
      {/* Logo and Text */}
      <div className="z-10 flex w-full lg:flex-row lg:w-1/2 items-center justify-center lg:justify-center bg-opacity-60 lg:bg-transparent p-8 text-center lg:text-left">
        <Image
          src="https://ik.imagekit.io/naufalrafi/Parion%20Logo%20(1).png?updatedAt=1702368775661"
          alt="Company Logo"
          width={100}
          height={100}
          objectFit="contain"
        />
        <h1 className="text-5xl text-white font-bold lg:ml-4">
          Parion
        </h1>
      </div>
      {/* Card for sign up */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-4">
        <Card
          placeholder={''}
          shadow={false}
          className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto py-8 px-4 sm:px-12"
        >
          <div className='flex justify-between'>
            <Typography placeholder={''} variant="h2" color="blue-gray">
              Sign Up
            </Typography>
            <Link href="/">
              <IconButton placeholder={''} variant="text" className="rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </IconButton>
              Back To Home
            </Link>
          </div>
          <Typography
            placeholder={''}
            color="gray"
            className="mt-2 font-normal"
          >
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-gray-900">
                Sign In
            </Link>
          </Typography>
          <div className="flex justify-start gap-4 mt-3">
            <Button
              placeholder={''}
              color="white"
              variant="outlined"
              className="border-2 border-gray-300 rounded-full p-3"
              onClick={() => handleSignInWithGoogle()}
            >
              <Image
                src="https://docs.material-tailwind.com/icons/google.svg"
                alt="Sign up with Google"
                width={24}
                height={24}
              />
            </Button>
            <Button
              placeholder={''}
              color="white"
              variant="outlined"
              className="border-2 border-gray-300 rounded-full p-3"
              onClick={() => handleSignInWithGithub()}
            >
              <Image
                src="https://cdns.iconmonstr.com/wp-content/releases/preview/2012/240/iconmonstr-github-1.png"
                alt="Sign up with Github"
                width={24}
                height={24}
              />
            </Button>
            <Button
              placeholder={''}
              color="white"
              variant="outlined"
              className="border-2 border-gray-300 rounded-full p-3"
              onClick={() => handleSignInWithFacebook()}
            >
              <Image
                src="https://www.vectorlogo.zone/logos/facebook/facebook-icon.svg"
                alt="Sign up with Facebook"
                width={24}
                height={24}
              />
            </Button>
          </div>
          <form className="mt-8 mb-2 w-full">
            <div className="mb-1 flex flex-col gap-6">
              <Typography
                placeholder={''}
                variant="h6"
                color="blue-gray"
                className="-mb-3"
              >
                Your Name
              </Typography>
              <Input
                crossOrigin={''}
                size="lg"
                placeholder="name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              <Typography
                placeholder={''}
                variant="h6"
                color="blue-gray"
                className="-mb-3"
              >
                Your Username
              </Typography>
              <Input
                crossOrigin={''}
                size="lg"
                placeholder="username"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              <Typography
                placeholder={''}
                variant="h6"
                color="blue-gray"
                className="-mb-3"
              >
                Your Email
              </Typography>
              <Input
                crossOrigin={''}
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              <Typography
                placeholder={''}
                variant="h6"
                color="blue-gray"
                className="-mb-3"
              >
                Password
              </Typography>
              <Input
                crossOrigin={''}
                type="password"
                size="lg"
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

export default LoginPage
