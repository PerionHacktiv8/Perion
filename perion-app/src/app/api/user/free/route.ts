import { UserModel, Users } from '@/db/models/user'
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

export const POST = async (req: NextRequest) => {
  try {
    const userId = req.headers.get('x-user-id') as string

    console.log(userId)

    await Users.updateFree(userId)

    return NextResponse.json<ResponseAPIType<unknown>>(
      {
        statusCode: 200,
        message: 'Successfully updating a users',
      },
      {
        status: 200,
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
