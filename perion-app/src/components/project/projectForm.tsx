'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Textarea,
  Select,
  Option,
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
}

export function ProjectForm() {
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
  })

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  console.log(input)
  console.log(inputSelect)

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
    console.log(response)
  }

  return (
    <>
      <Card placeholder={''} className="mx-auto w-full">
        <form action="" onSubmit={onSubmitInput}>
          <CardBody placeholder={''} className="flex flex-col gap-3">
            <Typography placeholder={''} variant="h4" color="blue-gray">
              Create a Project
            </Typography>
            <Typography
              placeholder={''}
              className="mb-1 font-normal"
              variant="paragraph"
              color="gray"
            >
              Start building your project:
            </Typography>
            <Typography placeholder={''} className="-mb-2" variant="h6">
              Title
            </Typography>
            <Input
              crossOrigin={''}
              label="Insert Title"
              size="lg"
              name="title"
              value={input.title}
              onChange={onChange}
            />
            <Typography placeholder={''} className="-mb-2" variant="h6">
              Project Description
            </Typography>
            <Textarea
              placeholder={''}
              label="Insert Description"
              size="lg"
              name="projectDescription"
              value={input.projectDescription}
              onChange={onChange}
            />
            <Typography placeholder={''} className="-mb-2" variant="h6">
              Work Description
            </Typography>
            <Textarea
              placeholder={''}
              label="Insert Description"
              size="lg"
              name="workDescription"
              value={input.workDescription}
              onChange={onChange}
            />
            <Typography placeholder={''} className="-mb-2" variant="h6">
              Project Location
            </Typography>
            <Input
              crossOrigin={''}
              label="Insert Location"
              size="lg"
              name="jobLocation"
              value={input.jobLocation}
              onChange={onChange}
            />
            <Typography placeholder={''} className="-mb-1" variant="h6">
              On Site Required
            </Typography>
            <div className="w-full">
              <Select
                placeholder={''}
                label="Select Requird"
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
                <Option value="onSite">On Site</Option>
                <Option value="remote">Remote</Option>
                <Option value="hybrid">Hybrid</Option>
              </Select>
            </div>
            <Typography placeholder={''} className="-mb-2" variant="h6">
              Experience
            </Typography>
            <Input
              crossOrigin={''}
              label="Insert Experience"
              size="lg"
              name="experience"
              value={input.experience}
              onChange={onChange}
            />
            <Typography placeholder={''} className="-mb-2" variant="h6">
              Benefits
            </Typography>
            <Input
              crossOrigin={''}
              label="Insert Benefits"
              size="lg"
              name="benefits"
              value={input.benefits}
              onChange={onChange}
            />
            <Typography placeholder={''} className="-mb-2" variant="h6">
              Position
            </Typography>
            <Input
              crossOrigin={''}
              label="Insert Position"
              size="lg"
              name="position"
              value={input.position}
              onChange={onChange}
            />
            <Typography placeholder={''} className="-mb-2" variant="h6">
              Job Type
            </Typography>
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
                <Option value="fullTime">Full Time</Option>
                <Option value="freeLance">Freelance</Option>
              </Select>
            </div>
            <Typography placeholder={''} className="-mb-2" variant="h6">
              Skills
            </Typography>
            <Textarea
              placeholder={''}
              label="Insert Skills"
              size="lg"
              name="skills"
              value={input.skills}
              onChange={onChange}
            />
            <Typography placeholder={''} className="-mb-2" variant="h6">
              Teams
            </Typography>
            <Input
              crossOrigin={''}
              label="Insert Teams"
              size="lg"
              name="teams"
              value={input.teams}
              onChange={onChange}
            />
          </CardBody>
          <CardFooter placeholder={''} className="pt-0">
            <Button type="submit" placeholder={''} variant="gradient">
              Create Project
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  )
}
