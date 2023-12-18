import { getMongoClientInstance } from '../../../../db/config/index'
import { admin } from '../../../../db/config/firebaseAdminInit'
import { NextResponse, NextRequest } from 'next/server'
import { ObjectId } from 'mongodb'
import { cookies } from 'next/headers'
import { createToken } from '@/libs/jwt'
import { hashPass } from '@/db/helpers/bcrypt'

type MyResponse<T> = {
  status: number
  message: string
  data?: T
}

export type data = {
  _id: ObjectId
  email: string
}

export async function POST(request: NextRequest) {
  const token = request.headers.get('authorization')?.split('Bearer ')[1]
  if (!token) {
    return NextResponse.json(<MyResponse<unknown>>{
      status: 401,
      message: 'Unauthorized',
    })
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token)

    const { email } = decodedToken
    const db = await getMongoClientInstance()

    const res = await db.collection('users').findOne({ email })

    if (!res) {
      throw new Error('No Account Yet')
    }

    const _id = res?._id

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
      status: 200,
      message: 'success',
      data: { email, _id },
    })
  } catch (err) {
    let status = 500
    let message = 'Internal Server Error'

    if (err instanceof Error) {
      status = 401
      message = err.message
    }

    return NextResponse.json(<MyResponse<unknown>>{
      status: status,
      message: message,
    })
  }
}
