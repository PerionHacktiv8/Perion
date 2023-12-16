import { NextRequest, NextResponse } from 'next/server'
import { readPayloadJose } from './libs/jwt'
import { cookies } from 'next/headers'

export const middleware = async (req: NextRequest) => {
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200 })
  }

  if (req.url.includes('/api/user') && req.method !== 'POST') {
    const cookiesStore = cookies()
    const token = cookiesStore.get('token')

    if (!token) {
      return NextResponse.json(
        {
          statusCode: 401,
          error: 'Unauthorized',
        },
        { status: 401 },
      )
    }

    const tokenData = await readPayloadJose<{
      id: string
      email: string
    }>(token.value)

    console.log(tokenData)

    const requestHeaders = new Headers(req.headers)

    requestHeaders.set('x-user-id', tokenData.id)
    requestHeaders.set('x-user-email', tokenData.email)

    return NextResponse.next({
      headers: requestHeaders,
    })
  }

  return NextResponse.next()
}
