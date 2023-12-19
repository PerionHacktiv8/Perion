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
import { RequirementCard } from './cardRequirement'
import { ProjectModel } from '@/db/models/project'
import dateFormat from '@/db/helpers/dateFormat'
import { format } from 'date-fns'

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
        className="max-w-[24rem] h-[20rem] overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl"
        onClick={handleOpen}
      >
        <CardBody placeholder={''} className="flex flex-col justify-between">
          <Typography placeholder={''} className="font-normal mb-2">
            {format(new Date(datum.createdAt), 'MMMM do, yyyy')}
          </Typography>
          <p className="text-lg text-black h-14 font-semibold">{datum.title}</p>
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
                  {datum.benefits}
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
