'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export const signOut = () => {
  cookies().get('token') && cookies().delete('token')

  redirect('/')
}
