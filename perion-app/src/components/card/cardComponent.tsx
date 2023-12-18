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
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from '@material-tailwind/react'
import Image from 'next/image'
import { RequirementCard } from './cardRequirement'
import { CarouselProject } from '../carousel'
import { ProjectModel } from '@/db/models/project'
import dateFormat from '@/db/helpers/dateFormat'

export function CardComponent({ datum }: { datum: ProjectModel }) {
  const [liked, setLiked] = useState(false)

  const handleLikeButtonClick = () => {
    setLiked((prevLiked) => !prevLiked)
  }

  const [open, setOpen] = React.useState(false)
  const [isFavorite, setIsFavorite] = React.useState(false)

  const handleOpen = () => setOpen((cur) => !cur)
  const handleIsFavorite = () => setIsFavorite((cur) => !cur)

  return (
    <>
      <Card
        placeholder={''}
        className="max-w-[24rem] overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl"
        onClick={handleOpen}
      >
        <CardHeader
          placeholder={''}
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none"
        >
          <div className="relative h-56 w-full">
            <img
              src="https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="ui/ux review check"
            />
          </div>
          <IconButton
            placeholder={''}
            color={liked ? 'orange' : 'white'}
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
            {dateFormat(datum.createdAt)}
          </Typography>
          <Typography
            placeholder={''}
            variant="h4"
            color="blue-gray"
            className="truncate"
          >
            {datum.title}
          </Typography>
          <Typography
            placeholder={''}
            variant="h6"
            color="blue-gray"
            className="mt-3"
          >
            {datum.position}
          </Typography>
          <Typography
            placeholder={''}
            variant="paragraph"
            color="gray"
            className="font-normal h-[5rem] line-clamp-3"
          >
            {datum.projectDescription}
          </Typography>
        </CardBody>
        <CardFooter
          placeholder={''}
          className="flex items-center justify-between"
        >
          <div className="flex -space-x-3">
            {/* <Tooltip content="Natali Craig">
              <Avatar
                placeholder={''}
                size="sm"
                variant="circular"
                alt="natali craig"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                className="border-2 border-white hover:z-10"
              />
            </Tooltip> */}
            <Typography placeholder={''} className="font-normal">
              {datum.teams}
            </Typography>
          </div>
        </CardFooter>
      </Card>
      <Dialog
        placeholder={''}
        size="xl"
        open={open}
        handler={handleOpen}
        className="overflow-y-auto"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader
          placeholder={''}
          className="justify-between border-b-2 mt-2 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <Avatar
              placeholder={''}
              size="md"
              variant="circular"
              alt="tania andrew"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <div className="-mt-px flex flex-col">
              <Typography
                placeholder={''}
                variant="small"
                color="blue-gray"
                className="font-bold"
              >
                Tania Andrew
              </Typography>
              <Typography
                placeholder={''}
                variant="small"
                color="gray"
                className="text-xs font-normal"
              >
                @emmaroberts
              </Typography>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <h5>{datum.title}</h5>
              <div className="flex flex-row gap-2 w-full justify-center">
                <p className="font-normal text-sm">{datum.position}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              placeholder={''}
              color="white"
              size="sm"
              className="hover:bg-gray-100 border-2 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
              <span>Save Project</span>
            </Button>
          </div>
        </DialogHeader>
        <DialogBody
          placeholder={''}
          className="h-auto sm:h-[30rem] md:h-[35rem] lg:h-[37rem] overflow-y-auto"
        >
          {/* <CarouselProject /> */}
          <div className="py-3 px-10 flex w-full gap-5">
            <section className="w-2/3">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <p className="text-black text-lg font-bold">About Us</p>
                  <p>{datum.workDescription}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-black text-lg font-bold">
                    About The Project
                  </p>
                  <p>{datum.projectDescription}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-black text-lg font-bold">
                    Minimum experience
                  </p>
                  <p>{datum.experience}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-black text-lg font-bold">Benefits</p>
                  {datum.benefits.split(', ').map((el, idx) => (
                    <p key={idx}>- {el}</p>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-black text-lg font-bold">Skills Needed</p>
                  {datum.skills.map((el, idx) => (
                    <p key={idx}>- {el}</p>
                  ))}
                </div>
              </div>
            </section>
            <section className="w-1/3">
              <RequirementCard datum={datum} />
            </section>
          </div>
        </DialogBody>
        <DialogFooter
          placeholder={''}
          className="justify-between flex flex-col border-t-2 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex items-center gap-16">
            <div>
              <Typography
                placeholder={''}
                variant="small"
                color="gray"
                className="font-normal"
              >
                Project Posted:
              </Typography>
              <Typography
                placeholder={''}
                color="blue-gray"
                className="font-medium"
              >
                {dateFormat(datum.createdAt)}
              </Typography>
            </div>
            <div>
              <Typography
                placeholder={''}
                variant="small"
                color="gray"
                className="font-normal"
              >
                Project Team :
              </Typography>
              <Typography
                placeholder={''}
                color="blue-gray"
                className="font-medium"
              >
                {datum.teams}
              </Typography>
            </div>
          </div>
          <Button placeholder={''} color="gray" size="md">
            Join Project
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
