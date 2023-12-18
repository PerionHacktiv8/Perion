'use client'

import React from 'react'
import { Navbar, Input, IconButton, Collapse } from '@material-tailwind/react'
import { NavList } from './navList'

export function NavbarWithMenu() {
  const [openNav, setOpenNav] = React.useState(false)

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960 && openNav) {
        setOpenNav(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [openNav])

  return (
    <Navbar
      placeholder={''}
      className="!sticky top-[3.4rem] z-20 max-w-full !bg-white rounded-none shadow-sm h-fit lg:px-1 lg:py-1"
    >
      <div className="flex items-center justify-around text-blue-gray-900">
        {/* Mobile Icon Button */}
        <IconButton
          placeholder={''}
          variant="text"
          className="lg:hidden mr-4"
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
        <div className="flex items-center ml-10 w-1/3">
          <img
            src="https://img.icons8.com/ios-glyphs/30/search--v1.png"
            alt=""
            width={16}
            height={16}
          />
          <input
            type="text"
            id="search"
            name="search"
            className="w-full bg-transparent text-gray-900 text-md focus:outline-none focus:ring-0 focus:border-none p-2.5"
            placeholder="Search..."
            autoComplete="off"
          />
        </div>

        {/* Desktop NavList */}
        <div className="hidden lg:flex">
          <NavList />
        </div>
      </div>

      {/* Mobile Navigation */}
      <Collapse open={openNav}>
        <div className="container mt-5 w-64 max-h-screen overflow-y-auto">
          <NavList />
        </div>
      </Collapse>
    </Navbar>
  )
}
