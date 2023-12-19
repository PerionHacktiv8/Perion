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
  subscription: boolean
  name: string
  email: string
}

export const POST = async (req: NextRequest) => {
  try {
    const userId = await req.json()

    const data: SetupData = await Users.findDet(userId)

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
