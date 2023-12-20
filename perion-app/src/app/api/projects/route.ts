import { Project, ProjectModel } from '@/db/models/project'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { input } from '@material-tailwind/react'

export type MyResponse<T> = {
  statusCode: number
  message?: string
  data?: T
  error?: string
}
export type input = {
  title: string
  projectDescription: string
  workDescription: string
  position: string
  jobLocation: string
  experience: string
  benefits: string
  teams: string
  skills: string
}
export type inputSelect = {
  jobType: string
  onSiteRequired: string
  jobCategory: string
}

export const POST = async (req: NextRequest) => {
  try {
    const inputForm = await req.json()
    const userId = req.headers.get('x-user-id') as string

    let input = inputForm.input as input
    let inputSelect = inputForm.inputSelect as inputSelect

    await Project.createProject(input, inputSelect, userId)

    return NextResponse.json<MyResponse<string>>(
      {
        statusCode: 201,
        message: 'Project Has Created',
      },
      {
        status: 201,
      },
    )
  } catch (err) {
    console.log(err)

    let errCode = 500
    let errMsg = 'Internal Server Error'

    if (err instanceof z.ZodError) {
      errCode = 400
      errMsg = err.issues[0].message
    }

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: errCode,
        error: errMsg,
      },
      {
        status: errCode,
      },
    )
  }
}

export const GET = async () => {
  try {
    const projects = await Project.readProjects()
    return NextResponse.json<MyResponse<ProjectModel[]>>(
      {
        statusCode: 200,
        message: 'Success on fetching',
        data: projects,
      },
      {
        status: 200,
      },
    )
  } catch (err) {
    let errCode = 500
    let errMsg = 'Internal Server Error'

    if (err instanceof z.ZodError) {
      errCode = 400
      errMsg = err.issues[0].message
    }

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: errCode,
        error: errMsg,
      },
      {
        status: errCode,
      },
    )
  }
}

export const DELETE = async (req: NextRequest) => {
  try {
    const data = await req.json()
    const id = data.id

    await Project.deleteProject(id)
    return NextResponse.json<MyResponse<ProjectModel>>(
      {
        statusCode: 200,
        message: 'Pong from DELETE /api/projects !',
      },
      {
        status: 200,
      },
    )
  } catch (err) {
    let errCode = 500
    let errMsg = 'Internal Server Error'

    if (err instanceof z.ZodError) {
      errCode = 400
      errMsg = err.issues[0].message
    }

    if (err instanceof Error) {
      errCode = 404
      errMsg = err.message
    }

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: errCode,
        error: errMsg,
      },
      {
        status: errCode,
      },
    )
  }
}
