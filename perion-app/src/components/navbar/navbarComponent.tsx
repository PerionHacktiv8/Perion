'use client'

import React from 'react'
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from '@material-tailwind/react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export function NavbarDefault() {
  const pathName = usePathname().split('/')[1]

  const [openNav, setOpenNav] = React.useState(false)
  const [navbarBackground, setNavbarBackground] = React.useState('transparent')

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false),
    )
  }, [])

  React.useEffect(() => {
    const changeNavbarBackground = () => {
      if (window.scrollY >= 80) {
        setNavbarBackground('white')
      } else {
        setNavbarBackground('transparent')
      }
    }

    window.addEventListener('scroll', changeNavbarBackground)

    // Clean up the event listener
    return () => window.removeEventListener('scroll', changeNavbarBackground)
  }, [])

  const textColor =
    navbarBackground === 'transparent' ? 'text-white' : 'text-gray-800'

  const navList = (
    <ul className="flex flex-col items-center gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <p className="flex items-center gap-x-2 p-1 font-semibold font-lg">
        <Link
          href="/"
          className={`flex items-center ${
            pathName === ''
              ? `scale-125 border-b-2 ${
                  navbarBackground === 'transparent' ? '' : 'border-black'
                } `
              : ''
          }`}
        >
          Explore
        </Link>
      </p>
      <Link
        href="/recruit"
        className={`flex font-bold items-center ${
          pathName === 'recruit'
            ? `scale-125 border-b-2 ${
                navbarBackground === 'transparent' ? '' : 'border-black'
              }`
            : ''
        }`}
      >
        Recruit
      </Link>
      <p className="flex items-center gap-x-2 p-1 font-semibold font-lg">
        <a href="#" className="flex items-center">
          Projects
        </a>
      </p>
    </ul>
  )

  return (
    <Navbar
      placeholder={''}
      blurred={false}
      className={`fixed h-fit max-w-full rounded-none p-2 transition-all duration-600 ease-in-out shadow-none z-50 ${
        navbarBackground === 'transparent' ? 'bg-transparent' : 'bg-white'
      } ${textColor}`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <Typography
            placeholder={''}
            as="p"
            className="flex flex-cols items-center mr-4 cursor-pointer py-1.5 text-xl font-extrabold"
          >
            <Image
              src="https://ik.imagekit.io/naufalrafi/Parion%20Logo%20(1).png?updatedAt=1702368775661"
              alt="logo"
              width={24}
              height={24}
              className="mr-2"
            />
            Parion
          </Typography>
        </Link>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-1">
          <Link href="/login">
            <Button
              placeholder={''}
              variant="text"
              size="sm"
              className={`hidden lg:inline-block ${textColor}`}
            >
              <span>Log In</span>
            </Button>
          </Link>
          <Link href="/register">
            <Button
              placeholder={''}
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
            >
              <span>Sign up</span>
            </Button>
          </Link>
        </div>
        <IconButton
          placeholder={''}
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="flex items-center justify-center gap-x-1">
            <Link href="/login" className="w-full">
              <Button
                placeholder={''}
                fullWidth
                variant="text"
                size="sm"
                className={`${textColor}`}
              >
                <span>Log In</span>
              </Button>
            </Link>
            <Link href="/register" className="w-full">
              <Button
                placeholder={''}
                fullWidth
                variant="gradient"
                size="sm"
                className=""
              >
                <span>Sign Up</span>
              </Button>
            </Link>
          </div>
        </div>
      </Collapse>
    </Navbar>
  )
}
