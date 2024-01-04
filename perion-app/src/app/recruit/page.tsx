'use server'

import { CardUser } from '@/components/card/cardUser'
import { HeroRecruit } from '@/components/hero/heroRecruit'
import { UserModel, Users } from '@/db/models/user'
import { cookies } from 'next/headers'
import { ResponseAPIType } from '../api/image/route'

export default async function Recruit() {
  const cookie = cookies()

  const data = await Users.findRecruits()

  const res = await fetch('http://localhost:3000/api/recruits', {
    headers: {
      Cookie: cookie.toString(),
    },
  })
  const resJson = (await res.json()) as ResponseAPIType<UserModel[]>
  const recruits = cookie.toString()
    ? resJson.data?.filter((el) => el.cvLink)
    : data.filter((el) => el.cvLink)

  return (
    <div className="flex flex-col bg-[#f5f5f5] min-h-screen">
      <HeroRecruit />
      <div className="py-8 px-4 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10 px-7">
            {recruits &&
              recruits.map((datum) => (
                <CardUser
                  datum={datum}
                  skills={datum.cvData.skills.splice(0, 5).join(', ')}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
