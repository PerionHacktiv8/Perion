'use client'
import React, { useEffect, useState } from 'react'

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
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
import { usePathname } from 'next/navigation'

export function CardComponent({ datum }: { datum: ProjectModel }) {
  const path = usePathname()
  const [open, setOpen] = React.useState(false)
  const [applied, setApplied] = useState<boolean>(false)

  const handleOpen = () => setOpen((cur) => !cur)

  const apply = async () => {
    const res = await fetch('http://localhost:3000/api/projects/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datum._id),
    })

    if (res.ok) {
      setApplied(true)
    }
  }

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
          className="border-b-2 mt-2 flex flex-col"
        >
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <h5>{datum.title}</h5>
              <div className="flex flex-row gap-2 w-full justify-center">
                <p className="font-normal text-sm">{datum.position}</p>
              </div>
            </div>
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
          {!path.includes('applied') && !path.includes('/profile/project') && (
            <Button onClick={apply} placeholder={''} color="gray" size="md">
              {applied ? 'Applied' : 'Join Project'}
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </>
  )
}
