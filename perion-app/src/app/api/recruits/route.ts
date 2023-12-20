import { UserModel, Users } from '@/db/models/user'
import { NextRequest, NextResponse } from 'next/server'

export type ResponseAPIType<T> = {
  statusCode: number
  message?: string
  data?: T
  error?: string
}

export const GET = async (req: NextRequest) => {
  try {
    const userId = req.headers.get('x-user-id') as string

    console.log(userId)
    const data = (await Users.findRecruits()).filter(
      (el) => el._id.toString() !== userId,
    ) as UserModel[]

    console.log(data)

    return NextResponse.json<ResponseAPIType<UserModel[]>>(
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
