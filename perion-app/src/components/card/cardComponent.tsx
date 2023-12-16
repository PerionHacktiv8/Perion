'use client'
import React, { useState } from 'react'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
} from '@material-tailwind/react'
import Image from 'next/image'

export function CardComponent() {
  const [liked, setLiked] = useState(false)

  const handleLikeButtonClick = () => {
    setLiked((prevLiked) => !prevLiked)
  }

  return (
    <Card
      placeholder={''}
      className="max-w-[24rem] overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl"
    >
      <CardHeader
        placeholder={''}
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <div className="relative h-56 w-full">
          <Image
            src="https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="ui/ux review check"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <IconButton
          placeholder={''}
          color={liked ? 'orange' : 'gray'}
          size="lg"
          variant="text"
          className="!absolute top-4 right-4 rounded-full"
          onClick={handleLikeButtonClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
              clipRule="evenodd"
            />
          </svg>
        </IconButton>
      </CardHeader>
      <CardBody placeholder={''}>
        <Typography placeholder={''} className="font-normal mb-2">
          Des 2023
        </Typography>
        <Typography
          placeholder={''}
          variant="h4"
          color="blue-gray"
          className="truncate"
        >
          Parion Game App Project
        </Typography>
        <Typography
          placeholder={''}
          variant="h6"
          color="blue-gray"
          className="mt-3"
        >
          Game Development
        </Typography>
        <Typography
          placeholder={''}
          variant="paragraph"
          color="gray"
          className="font-normal line-clamp-3"
        >
          Because it&apos;s about motivating the doers. Because I&apos;m here to
          follow my dreams and inspire others. Because it&apos;s about
          motivating the doers. Because I&apos;m here to follow my dreams and
          inspire others. Because it&apos;s about motivating the doers. Because
          I&apos;m here to follow my dreams and inspire others.
        </Typography>
      </CardBody>
      <CardFooter
        placeholder={''}
        className="flex items-center justify-between"
      >
        <div className="flex items-center -space-x-3">
          <Tooltip content="Natali Craig">
            <Avatar
              placeholder={''}
              size="sm"
              variant="circular"
              alt="natali craig"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
              className="border-2 border-white hover:z-10"
            />
          </Tooltip>
          <Tooltip content="Tania Andrew">
            <Avatar
              placeholder={''}
              size="sm"
              variant="circular"
              alt="tania andrew"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              className="border-2 border-white hover:z-10"
            />
          </Tooltip>
          <Typography placeholder={''} className="font-normal pl-6">
            Parion Team
          </Typography>
        </div>
        <div className="flex flex-row gap-2">
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
              d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
          5
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
              d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
            />
          </svg>
          7
        </div>
      </CardFooter>
    </Card>
  )
}
