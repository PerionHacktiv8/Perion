'use client'
import React from 'react'
import {
  Navbar,
  Collapse,
  Typography,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const navListSoftDevelopment = [
  {
    title: 'Web Applications',
  },
  {
    title: 'Desktop Applications',
  },
  {
    title: 'APIs & Integration',
  },
]

const navListSoftDevelopers = [
  {
    title: 'Pyhton Developers',
  },
  {
    title: 'HTML & CSS Developers',
  },
  {
    title: 'JavaScript Developers',
  },
  {
    title: 'Java Developers',
  },
  {
    title: 'PHP Developers',
  },
]

const navListMobileApp = [
  {
    title: 'Android App Development',
  },
  {
    title: 'IOS App Development',
  },
  {
    title: 'Cross-Platform Development',
  },
]

const navListGameDevelopment = [
  {
    title: 'PC Games',
  },
  {
    title: 'Mobile Games',
  },
  {
    title: 'Console Games',
  },
]

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const renderItems = navListSoftDevelopment.map(({ title }, key) => (
    <a href="#" key={key}>
      <MenuItem placeholder={''} className="flex items-center gap-3 rounded-lg">
        <div>
          <Typography
            placeholder={''}
            variant="paragraph"
            color="blue-gray"
            className="flex items-center text-sm"
          >
            {title}
          </Typography>
        </div>
      </MenuItem>
    </a>
  ))

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography
            placeholder={''}
            as="div"
            variant="small"
            className="font-medium"
          >
            <ListItem
              placeholder={''}
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Software Development
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? 'rotate-180' : ''
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList
          placeholder={''}
          className="hidden max-w-screen-xl rounded-xl lg:block"
        >
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  )
}

function NavListMenu1() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const renderItems = navListSoftDevelopers.map(({ title }, key) => (
    <a href="#" key={key}>
      <MenuItem placeholder={''} className="flex items-center gap-3 rounded-lg">
        <div>
          <Typography
            placeholder={''}
            variant="paragraph"
            color="blue-gray"
            className="flex items-center text-sm"
          >
            {title}
          </Typography>
        </div>
      </MenuItem>
    </a>
  ))

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography
            placeholder={''}
            as="div"
            variant="small"
            className="font-medium"
          >
            <ListItem
              placeholder={''}
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Software Developers
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? 'rotate-180' : ''
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList
          placeholder={''}
          className="hidden max-w-screen-xl rounded-xl lg:block"
        >
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  )
}

function NavListMenu2() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const renderItems = navListMobileApp.map(({ title }, key) => (
    <a href="#" key={key}>
      <MenuItem placeholder={''} className="flex items-center gap-3 rounded-lg">
        <div>
          <Typography
            placeholder={''}
            variant="paragraph"
            color="blue-gray"
            className="flex items-center text-sm"
          >
            {title}
          </Typography>
        </div>
      </MenuItem>
    </a>
  ))

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography
            placeholder={''}
            as="div"
            variant="small"
            className="font-medium"
          >
            <ListItem
              placeholder={''}
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Mobile App Development
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? 'rotate-180' : ''
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList
          placeholder={''}
          className="hidden max-w-screen-xl rounded-xl lg:block"
        >
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  )
}

function NavListMenu3() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const renderItems = navListGameDevelopment.map(({ title }, key) => (
    <a href="#" key={key}>
      <MenuItem placeholder={''} className="flex items-center gap-3 rounded-lg">
        <div>
          <Typography
            placeholder={''}
            variant="paragraph"
            color="blue-gray"
            className="flex items-center text-sm"
          >
            {title}
          </Typography>
        </div>
      </MenuItem>
    </a>
  ))

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography
            placeholder={''}
            as="div"
            variant="small"
            className="font-medium"
          >
            <ListItem
              placeholder={''}
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Game Development
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? 'rotate-180' : ''
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList
          placeholder={''}
          className="hidden max-w-screen-xl rounded-xl lg:block"
        >
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  )
}

export function NavList() {
  return (
    <List
      placeholder={''}
      className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1"
    >
      <NavListMenu />
      <NavListMenu1 />
      <NavListMenu2 />
      <NavListMenu3 />
    </List>
  )
}
