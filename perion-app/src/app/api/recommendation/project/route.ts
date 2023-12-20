import { Project, ProjectModel } from '@/db/models/project'
import { UserModel, Users } from '@/db/models/user'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export type MyResponse<T> = {
  statusCode: number
  message?: string
  data?: T
  error?: string
}

export const GET = async () => {
  try {
    let data = (await Users.findRecruits()) as UserModel[]

    data = data.filter((el) => el.cvLink)

    return NextResponse.json<MyResponse<UserModel[]>>(
      {
        statusCode: 200,
        message: 'Success on fetching',
        data,
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
