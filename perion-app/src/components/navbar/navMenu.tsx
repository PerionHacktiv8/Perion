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
    <Navbar placeholder={''} className="max-w-full lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
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

        <div className="relative flex w-full lg:w-auto lg:flex-grow gap-2 mb-4">
          <Input
            crossOrigin={''}
            type="search"
            placeholder="Search The Project"
            containerProps={{
              className: 'min-w-[288px]',
            }}
            className="!border-t-blue-gray-300 pl-14 pt-4 bg-gray-100 focus:font-bold focus:text-lg placeholder:text-gray-700 placeholder:font-bold placeholder:text-lg focus:!border-blue-gray-300 rounded-full h-14"
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
          />
          {/* Search Icon */}
          <div className="!absolute left-5 top-[17px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
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
