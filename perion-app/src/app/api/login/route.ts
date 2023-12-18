import { NextResponse, NextRequest } from 'next/server'
import { ObjectId } from 'mongodb'
import { cookies } from 'next/headers'
import { createToken } from '@/libs/jwt'
import { UserModel, Users } from '@/db/models/user'
import { z } from 'zod'

type MyResponse<T> = {
  statusCode: number
  message: string
  data?: T
}

export type data = {
  _id: ObjectId
  email: string
}

type LoginInput = {
  email: string
  password: string
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as LoginInput

    const res = (await Users.login(data.email, data.password)) as UserModel

    const jwt_token = createToken({
      id: res?._id,
      email: res?.email,
    })

    cookies().set('token', jwt_token, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 30),
      sameSite: 'strict',
    })

    return NextResponse.json(<MyResponse<data>>{
      statusCode: 200,
      message: 'success',
      // data: { email, _id },
    })
  } catch (err) {
    let statusCode = 500
    let message = 'Internal Server Error'

    if (err instanceof z.ZodError) {
      statusCode = 400
      message = err.issues[0].message
    }

    if (err instanceof Error) {
      statusCode = 400
      message = err.message
    }

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: statusCode,
        message: message,
      },
      {
        status: statusCode,
      },
    )
  }
}
