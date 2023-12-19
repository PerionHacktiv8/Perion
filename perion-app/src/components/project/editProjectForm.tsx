'use client'
import React from 'react'
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

export function EditProjectForm() {
  return (
    <>
      <Card placeholder={''} className="mx-auto w-full">
        <CardBody placeholder={''} className="flex flex-col gap-3">
          <Typography placeholder={''} variant="h4" color="blue-gray">
            (Nama Project)
          </Typography>
          <Typography
            placeholder={''}
            className="mb-1 font-normal"
            variant="paragraph"
            color="gray"
          >
            Edit your project :
          </Typography>
          <Typography placeholder={''} className="-mb-2" variant="h6">
            Title
          </Typography>
          <Input crossOrigin={''} label="Insert Title" size="lg" />
          <Typography placeholder={''} className="-mb-2" variant="h6">
            Description
          </Typography>
          <Textarea placeholder={''} label="Insert Description" size="lg" />
          <Typography placeholder={''} className="-mb-2" variant="h6">
            Project Location
          </Typography>
          <Input crossOrigin={''} label="Insert Location" size="lg" />
          <Typography placeholder={''} className="-mb-1" variant="h6">
            Onsite Requird
          </Typography>
          <div className="w-full">
            <Select placeholder={''} label="Select Requird">
              <Option>On Site</Option>
              <Option>Remote</Option>
              <Option>Hybrid</Option>
            </Select>
          </div>
          <Typography placeholder={''} className="-mb-2" variant="h6">
            Experience
          </Typography>
          <Input crossOrigin={''} label="Insert Experience" size="lg" />
          <Typography placeholder={''} className="-mb-2" variant="h6">
            Benefits
          </Typography>
          <Input crossOrigin={''} label="Insert Benefits" size="lg" />
          <Typography placeholder={''} className="-mb-2" variant="h6">
            Job Type
          </Typography>
          <div className="w-full">
            <Select placeholder={''} label="Select Type">
              <Option>Full Time</Option>
              <Option>Freelance</Option>
            </Select>
          </div>
        </CardBody>
        <CardFooter placeholder={''} className="pt-0">
          <Button placeholder={''} variant="gradient">
            Save Project
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
