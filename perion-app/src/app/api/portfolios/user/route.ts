import {
  Portfolio,
  PortfolioModel,
  inputPortfolio,
} from '@/db/models/portfolio'
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

    const portfolios = (await Portfolio.readPortfolios()).filter(
      (el) => el.userId.toString() === userId,
    )

    if (!portfolios) {
      throw new Error('Porfolios Not Found')
    }

    return NextResponse.json<MyResponse<PortfolioModel[]>>(
      {
        statusCode: 200,
        message: 'Pong from GET /api/portfolios !',
        data: portfolios,
      },
      {
        status: 200,
      },
    )
  } catch (err) {
    let errCode = 500
    let errMsg = 'INTERNAL SERVER ERROR'

    if (err instanceof z.ZodError) {
      errCode = 400
      errMsg = err.issues[0].message
    }
    if (err instanceof Error) {
      errCode = 404
      errMsg = err.message
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

export const DELETE = async (req: NextRequest) => {
  try {
    const data = await req.json()
    const id = data._id

    await Portfolio.deletePortfolio(id)

    return NextResponse.json<MyResponse<string>>(
      {
        statusCode: 200,
        message: 'Pong from DELETE /api/portfolios !',
      },
      {
        status: 200,
      },
    )
  } catch (err) {
    let errCode = 500
    let errMsg = 'INTERNAL SERVER ERROR'

    if (err instanceof z.ZodError) {
      errCode = 400
      errMsg = err.issues[0].message
    }
    if (err instanceof Error) {
      errCode = 404
      errMsg = err.message
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
