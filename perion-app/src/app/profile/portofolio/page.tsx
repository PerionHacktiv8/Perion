'use client'
import { CreateBoxPorto } from '@/components/portofolio/boxPorto'
import { ProfileCard } from '@/components/profile/profileCard'
import { ProfileNav } from '@/components/profile/profileNav'

export default function Portfolio() {
  return (
    <div className="container px-4 sm:px-8 md:px-12 py-4 md:py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-24">
        {/* Left side */}
        <div className="w-full lg:w-1/4 px-4">
          <ProfileCard />
        </div>

        {/* Right side */}
        <div className="w-full lg:w-3/4 px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-4 px-4">
            <ProfileNav />
          </div>

          <div className="px-4">
            <CreateBoxPorto />
          </div>
        </div>
      </div>
    </div>
  )
}
