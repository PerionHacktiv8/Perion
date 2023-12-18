import { Users } from '@/db/models/user'
import { NextRequest, NextResponse } from 'next/server'

export type ResponseAPIType<T> = {
  statusCode: number
  message?: string
  data?: T
  error?: string
}

export type SetupData = {
  picture?: string
  firstTime: boolean
}

export const GET = async (req: NextRequest) => {
  try {
    const userId = req.headers.get('x-user-id') as string

    const data: SetupData = await Users.findProfile(userId)

    return NextResponse.json<ResponseAPIType<SetupData>>(
      {
        statusCode: 200,
        message: 'Success on fetching all data',
        data: data,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return NextResponse.json<ResponseAPIType<unknown>>(
      {
        statusCode: 200,
        message: 'Error on fetching all data',
      },
      {
        status: 200,
      },
    )
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.formData()

    return NextResponse.json<ResponseAPIType<unknown>>(
      {
        statusCode: 201,
        message: 'Successfully created a users',
      },
      {
        status: 201,
      },
    )
  } catch (err) {
    let statusCode = 500
    if (err !== 'Internal Server Error') statusCode = 400

    return NextResponse.json(
      {
        statusCode,
        error: err,
      },
      {
        status: statusCode,
      },
    )
  }
}
