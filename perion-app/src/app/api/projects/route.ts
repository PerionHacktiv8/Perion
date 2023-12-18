import { Project, ProjectModel } from '@/db/models/project'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export type MyResponse<T> = {
  statusCode: number
  message?: string
  data?: T
  error?: string
}

export const POST = async (req: NextRequest) => {
  try {
    const input = await req.formData()

    await Project.createProject(input)

    return NextResponse.json<MyResponse<string>>(
      {
        statusCode: 200,
        message: 'Project Has Created',
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

export const GET = async () => {
  try {
    const projects = await Project.readProjects()
    if (!projects) {
      throw new Error('Cannot find data')
    }

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
    const id = data._id

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
