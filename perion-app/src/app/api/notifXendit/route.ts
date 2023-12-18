import { Users } from '@/db/models/user'
import { NextRequest, NextResponse } from 'next/server'
import { InvoiceCallback } from 'xendit-node/invoice/models'
import { z } from 'zod'

type MyResponse<T> = {
  statusCode: number
  message?: string
  data?: T
  error?: string
}

export const GET = async (req: NextRequest) => {
  try {
    console.log(req.json())

    return NextResponse.json<MyResponse<unknown>>({
      statusCode: 200,
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

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json()

    await Users.updateStatus(data.external_id)

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 200,
      },
      {
        status: 200,
      },
    )
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
