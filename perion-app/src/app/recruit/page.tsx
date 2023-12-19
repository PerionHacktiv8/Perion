'use server'

import { CardUser } from '@/components/card/cardUser'
import { HeroRecruit } from '@/components/hero/heroRecruit'
import { UserModel, Users } from '@/db/models/user'

export default async function Recruit() {
  const data = (await Users.findRecruits()) as UserModel[]

  const recruits = data.filter((datum) => datum.cvLink)

  return (
    <div className="flex flex-col bg-[#f5f5f5] min-h-screen">
      <HeroRecruit />
      <div className="py-8 px-4 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10 px-7">
            {recruits.map((datum) => (
              <CardUser datum={datum} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
