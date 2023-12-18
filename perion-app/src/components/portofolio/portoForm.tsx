'use client'
import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
 
export function ProjectForm() {
 
  return (
    <>
        <Card placeholder={''} className="mx-auto w-full">
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
            <Input crossOrigin={''} label="Insert Title" size="lg" />
            <Typography placeholder={''} className="-mb-2" variant="h6">
              Description
            </Typography>
            <Textarea placeholder={''} label="Insert Description" size="lg" />
            <Typography placeholder={''} className="-mb-2" variant="h6">
              Website Link
            </Typography>
            <Input crossOrigin={''} label="Insert Website Link" size="lg" />
          </CardBody>
          <CardFooter placeholder={''} className="pt-0">
            <Button placeholder={''} variant="gradient" >
              Create Project
            </Button>
          </CardFooter>
        </Card>
    </>
  );
}