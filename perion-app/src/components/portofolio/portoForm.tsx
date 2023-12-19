'use client'
import React from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from '@material-tailwind/react'

const PortfolioForm = ({
  open,
  handleOpen,
}: {
  open: boolean
  handleOpen: () => void
}) => {
  return (
    <>
      <Dialog
        placeholder={''}
        size="xl"
        open={open}
        handler={handleOpen}
        className="shadow-none overflow-y-auto"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader
          placeholder={''}
          className="justify-center border-b-2 mt-2 flex flex-col lg:flex-row lg:items-center lg:justify-center gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="mt-px flex flex-col">
              <p className="font-bold text-lg">Create a Portfolio</p>
              <p className="mb-1 font-normal text-sm">
                Insert your portofolio:
              </p>
            </div>
          </div>
        </DialogHeader>
        <DialogBody
          placeholder={''}
          className="h-auto sm:h-[30rem] md:h-[35rem] lg:h-[37rem] overflow-y-auto flex flex-col gap-3"
        >
          <form action="">
            <p className="font-bold text-lg text-black">Title</p>
            <Input
              crossOrigin={''}
              label="Insert Title"
              size="lg"
              name="title"
              // value={input.title}
              // onChange={onChange}
            />
            <p className="mt-3 mb-2 font-bold text-lg text-black">
              Description
            </p>
            <Textarea
              placeholder={''}
              label="Insert Description"
              size="lg"
              name="workDescription"
              // value={input.workDescription}
              // onChange={onChange}
            />
            <p className="mt-3 mb-2 font-bold text-lg text-black">
              Website Link
            </p>
            <Input
              crossOrigin={''}
              label="Insert Website Link"
              size="lg"
              name="jobLocation"
              // value={input.jobLocation}
              // onChange={onChange}
            />
          </form>
        </DialogBody>
        <DialogFooter
          placeholder={''}
          className="justify-between flex flex-col border-t-2 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex items center gap-3">
            <Button type="submit" placeholder={''} color="gray" size="md">
              Create Portfolio
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  )
}
export default PortfolioForm
