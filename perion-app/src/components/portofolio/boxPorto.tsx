import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from '@material-tailwind/react'
import React, { useState, ChangeEvent, FormEvent } from 'react'

type inputPortfolio = {
  title: string
  thumbnail: string
  description: string
  link: string
}

export function CreateBoxPorto({ fetchData }: { fetchData: () => void }) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [input, setInput] = useState<inputPortfolio>({
    title: '',
    thumbnail: '',
    description: '',
    link: '',
  })

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmitInput = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await fetch(`http://localhost:3000/api/portfolios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input,
      }),
    })
    if (response.ok) {
      fetchData()
      handleClose()
    }
  }
  return (
    <>
      <div
        className="w-80 h-52 flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg "
        style={{ minWidth: '300px', maxWidth: '500px' }}
        onClick={handleOpen}
      >
        <div className="flex items-center justify-center rounded-full bg-blue-100 h-16 w-16 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <button className="bg-white py-2 px-4 border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Upload your Portfolio
        </button>
        <p className="text-sm bg-white p-2 rounded text-gray-700 mt-2">
          Unpublished portfolio will appear here.
        </p>
      </div>

      <Dialog
        placeholder={''}
        size="xl"
        open={open}
        handler={handleClose}
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
          <form action="" onSubmit={onSubmitInput}>
            <p className="font-bold text-lg text-black">Title</p>
            <Input
              crossOrigin={''}
              label="Insert Title"
              size="lg"
              name="title"
              value={input.title}
              onChange={onChange}
            />
            <p className="font-bold text-lg text-black">Thumbnail</p>
            <Input
              crossOrigin={''}
              label="Insert Thumbnail"
              size="lg"
              name="thumbnail"
              value={input.thumbnail}
              onChange={onChange}
            />
            <p className="mt-3 mb-2 font-bold text-lg text-black">
              Description
            </p>
            <Textarea
              placeholder={''}
              label="Insert Description"
              size="lg"
              name="description"
              value={input.description}
              onChange={onChange}
            />
            <p className="mt-3 mb-2 font-bold text-lg text-black">
              Website Link
            </p>
            <Input
              crossOrigin={''}
              label="Insert Website Link"
              size="lg"
              name="link"
              value={input.link}
              onChange={onChange}
            />
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
          </form>
        </DialogBody>
      </Dialog>
    </>
  )
}
