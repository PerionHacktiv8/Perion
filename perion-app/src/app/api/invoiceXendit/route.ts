import { Users } from '@/db/models/user'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

type MyResponse<T> = {
  statusCode: number
  message?: string
  data?: T
  error?: string
}

export const POST = async (req: NextRequest) => {
  try {
    const userId = req.headers.get('x-user-id') as string
    const email = req.headers.get('x-user-email') as string

    const payment = await Users.invoiceXendit(email, userId)

    return NextResponse.json<MyResponse<string>>({
      statusCode: 201,
      data: payment,
    })
  } catch (err) {
    let statusCode = 500
    let message = 'Internal Server Error'

    if (err instanceof z.ZodError) {
      statusCode = 400
      message = err.issues[0].message
    }

    return NextResponse.json<MyResponse<never>>(
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
