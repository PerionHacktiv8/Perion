import { Project, ProjectModel } from '@/db/models/project'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export type MyResponse<T> = {
  statusCode: number
  message?: string
  data?: T
  error?: string
}

export const GET = async (req: NextRequest) => {
  try {
    const userId = req.headers.get('x-user-id') as string

    const projects = await Project.recommendation(userId)

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
