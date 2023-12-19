'use client'
import { ProfileCard } from '@/components/profile/profileCard'
import { EditProjectForm } from '@/components/project/EditProjectForm'

export default function Portfolio() {
  return (
    <div className="container px-4 sm:px-8 md:px-12 py-4 md:py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-24">
        <div className="md:col-span-1 px-2 md:px-4">
          <ProfileCard />
        </div>

        <div className="md:col-span-2 px-2 md:px-4 py-4 md:py-4 bg-white rounded-xl w-full">
          <div className="px-2 sm:px-4">
            <EditProjectForm />
          </div>
        </div>
      </div>
    </div>
  )
}
