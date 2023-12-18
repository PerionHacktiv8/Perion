'use client'
import { CreateBoxPorto } from '@/components/profile/boxPorto'
import { EditForm } from '@/components/profile/editForm'
import { ProfileCard } from '@/components/profile/profileCard'

export default function Portfolio() {
  return (
    <div className="container px-12 py-8">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-1/4 px-4 py-7">
          <ProfileCard />
        </div>

        <div className="w-full lg:w-3/4 px-4 sm:py-4 mt-3">
          <div className="px-4 lg:px-32">
            <EditForm />
          </div>
        </div>
      </div>
    </div>
  )
}
