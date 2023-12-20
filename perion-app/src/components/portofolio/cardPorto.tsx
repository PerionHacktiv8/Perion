import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from '@material-tailwind/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { PortfolioModel } from '@/db/models/portfolio'
import { ButtonDeletePortfolio } from '../ButtonDeletePortfolio'

export function CardPortfolio({
  datum,
  fetchData,
}: {
  datum: PortfolioModel
  fetchData: () => void
}) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <Card
        onClick={handleOpen}
        placeholder={''}
        className="max-w-xs w-full h-52 sm:w-80 md:max-w-none md:w-80 lg:w-80 overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
      >
        <CardBody placeholder={''}>
          <div className="flex items-center gap-4 mb-5">
            <Avatar
              placeholder={''}
              src={datum.thumbnail}
              alt="avatar"
              size="md"
            />
            <div>
              <p className="font-bold text-md">{datum.title}</p>
              {/* <p
                color="black"
                className="flex justify-center items-center gap-1 mx-auto text-xs"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
                Jakarta, Indonesia
              </p> */}
            </div>
          </div>
          {/* <p className="font-bold text-md">Pair Your Passion</p> */}
          <p className="text-sm">{datum.description}</p>
        </CardBody>
        <CardFooter placeholder={''} className="py-4">
          <Typography placeholder={''} variant="small">
            10 December 2023
          </Typography>
        </CardFooter>
      </Card>

      <Dialog
        placeholder={''}
        size="xl"
        open={open}
        handler={handleClose}
        className="overflow-y-auto"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader placeholder={''} className="border-b-2 mt-2">
          <div className="flex flex-col items-center justify-center gap-4 p-2 w-full">
            <Avatar
              placeholder={''}
              src={datum.thumbnail}
              alt="avatar"
              size="xl"
              className="mb-4 lg:mb-0"
            />

            <div className="text-center w-full">
              <h2 className="text-2xl font-bold">{datum.title}</h2>
              {/* <p className="text-gray-700 text-lg mt-1">{}</p> */}

              <div className="flex flex-col items-center gap-2 lg:flex-row justify-center mt-4">
                <Button
                  placeholder={''}
                  color="white"
                  size="sm"
                  className="hover:bg-gray-100 border-2 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                  <span>Save Portfolio</span>
                </Button>
              </div>
            </div>
          </div>
        </DialogHeader>

        <DialogBody
          placeholder={''}
          className="h-auto sm:h-[15rem] md:h-[20rem] lg:h-[25rem] overflow-y-auto"
        >
          {/* <CarouselProject /> */}
          <div className="py-3 px-10 flex w-full gap-5">
            <section className="w-2/3">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <p className="text-black text-lg font-bold">
                    About The Portfolio
                  </p>
                  <p>{datum.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-black text-lg font-bold">Link App</p>
                  <p>{datum.link}</p>
                </div>
              </div>
            </section>
            <section className="w-1/3">{/* <RequirementCard /> */}</section>
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
                Portfolio Posted:
              </Typography>
              <Typography
                placeholder={''}
                color="blue-gray"
                className="font-medium"
              >
                27 September 2023
              </Typography>
            </div>
            {/* <div>
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
                Parion team
              </Typography>
            </div> */}
          </div>
          <div className="flex items center gap-3">
            {/* <Link href={'/profile/project/edit-project'}> */}
            <ButtonDeletePortfolio
              _id={datum._id}
              handleClose={handleClose}
              fetchData={fetchData}
            />
            {/* </Link> */}
            {/* <Button placeholder={''} color="gray" size="md">
              Join Project
            </Button> */}
          </div>
        </DialogFooter>
      </Dialog>
    </>
  )
}
