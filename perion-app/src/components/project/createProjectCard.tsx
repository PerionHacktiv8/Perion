'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import {
  Button,
  Input,
  Textarea,
  Select,
  Option,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react'

type inputProjectModel = {
  title: string
  projectDescription: string
  workDescription: string
  position: string
  jobLocation: string
  experience: string
  benefits: string
  teams: string
  skills: string[]
}

type inputSelect = {
  jobType: string
  onSiteRequired: string
  jobCategory: string
}

type Props = {
  fetchData: () => void
}

const CardProjectForm = ({ fetchData }: Props) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [input, setInput] = useState<inputProjectModel>({
    title: '',
    projectDescription: '',
    workDescription: '',
    position: '',
    jobLocation: '',
    experience: '',
    benefits: '',
    teams: '',
    skills: [],
  })
  const [inputSelect, setInputSelect] = useState<inputSelect>({
    jobType: '',
    onSiteRequired: '',
    jobCategory: '',
  })

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }
  const onSubmitInput = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await fetch(`http://localhost:3000/api/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input,
        inputSelect,
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
        className="w-80 h-52 flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg my-8"
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
          Create your Project
        </button>
        <p className="text-sm bg-white p-2 rounded text-gray-700 mt-2">
          Unpublished project will appear here.
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
          className="justify-center border-b-2 flex flex-col lg:flex-row lg:items-center lg:justify-center"
        >
          <div className="flex flex-col items-center gap-3">
            <p className="font-bold text-xl">Create a Project</p>
            <p className="mb-1 font-normal text-sm">
              Start building your project:
            </p>
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
            <p className="mt-3 mb-2 font-bold text-lg text-black">
              Project Description
            </p>
            <Textarea
              placeholder={''}
              label="Insert Description"
              size="lg"
              name="projectDescription"
              value={input.projectDescription}
              onChange={onChange}
            />
            <p className="mt-3 mb-2 font-bold text-lg text-black">
              Work Description
            </p>
            <Textarea
              placeholder={''}
              label="Insert Description"
              size="lg"
              name="workDescription"
              value={input.workDescription}
              onChange={onChange}
            />
            <p className="mt-3 mb-2 font-bold text-lg text-black">
              Project Location
            </p>
            <Input
              crossOrigin={''}
              label="Insert Location"
              size="lg"
              name="jobLocation"
              value={input.jobLocation}
              onChange={onChange}
            />
            <p className="mt-3 mb-2 font-bold text-lg text-black">
              On Site Required
            </p>
            <div className="w-full">
              <Select
                placeholder={''}
                label="Select On Site Required"
                name="onSiteRequired"
                value={inputSelect.onSiteRequired}
                onChange={(e) => {
                  if (e)
                    setInputSelect({
                      ...inputSelect,
                      onSiteRequired: e,
                    })
                }}
              >
                <Option value="On Site">On Site</Option>
                <Option value="Remote">Remote</Option>
                <Option value="Hybrid">Hybrid</Option>
              </Select>
            </div>
            <p className="mt-3 mb-2 font-bold text-lg text-black">Experience</p>
            <Input
              crossOrigin={''}
              label="Insert Experience"
              size="lg"
              name="experience"
              value={input.experience}
              onChange={onChange}
            />
            <p className="mt-3 mb-2 font-bold text-lg text-black">Benefits</p>
            <Input
              crossOrigin={''}
              label="Insert Benefits"
              size="lg"
              name="benefits"
              value={input.benefits}
              onChange={onChange}
            />
            <p className="mt-3 mb-2 font-bold text-lg text-black">Position</p>
            <Input
              crossOrigin={''}
              label="Insert Position"
              size="lg"
              name="position"
              value={input.position}
              onChange={onChange}
            />
            <p className="mt-3 mb-2 font-bold text-lg text-black">Job Type</p>
            <div className="w-full">
              <Select
                placeholder={''}
                label="Select Type"
                name="jobType"
                value={inputSelect.jobType}
                onChange={(e) => {
                  if (e)
                    setInputSelect({
                      ...inputSelect,
                      jobType: e,
                    })
                }}
              >
                <Option value="Full Time">Full Time</Option>
                <Option value="Freelance">Freelance</Option>
              </Select>
            </div>
            <p className="mt-3 mb-2 font-bold text-lg text-black">
              Job Category
            </p>
            <div className="w-full">
              <Select
                placeholder={''}
                label="Select Job Category"
                name="jobCategory"
                value={inputSelect.jobCategory}
                onChange={(e) => {
                  if (e)
                    setInputSelect({
                      ...inputSelect,
                      jobCategory: e,
                    })
                }}
              >
                <Option value="Web Developer">Web developer</Option>
                <Option value="Software Developer">Software Developer</Option>
                <Option value="Mobile App Developer">
                  Mobile App Developer
                </Option>
                <Option value="Game Developer">Game Developer</Option>
              </Select>
            </div>
            <p className="mt-3 mb-2 font-bold text-lg text-black">Skills</p>
            <Textarea
              placeholder={''}
              label="Insert Skills"
              size="lg"
              name="skills"
              value={input.skills}
              onChange={onChange}
            />
            <p className="mt-3 mb-2 font-bold text-lg text text-black">Teams</p>
            <Input
              crossOrigin={''}
              label="Insert Teams"
              size="lg"
              name="teams"
              value={input.teams}
              onChange={onChange}
            />
            <Button
              type="submit"
              placeholder={''}
              color="gray"
              size="md"
              className="mt-5"
            >
              Create Project
            </Button>
          </form>
        </DialogBody>
      </Dialog>
    </>
  )
}

export default CardProjectForm
