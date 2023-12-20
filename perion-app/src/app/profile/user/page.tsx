'use client'
import { CreateProjectCard } from '@/components/project/createProjectCard'
import { ProfileCardUser } from '@/components/profile/profileCardUser'
import { ProfileNav } from '@/components/profile/profileNav'
import ProjectCardDialog from '@/components/project/projectCardDialog'

export default function Profile() {
  return (
    <div className="container px-4 sm:px-8 md:px-12 py-4 md:py-8">
      {/* Navigation and Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Profile Card - Left Side */}
        <div className="lg:col-span-1">
          <ProfileCardUser />
        </div>

        {/* Main Content - Right Side */}
        <div className="lg:col-span-2">
          {/* Profile Navigation */}
          <div className="mb-4 px-32">
            <ProfileNav />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Create Box */}
            <div className="flex justify-center items-center">
              <CreateProjectCard />
            </div>

            {/* Card Project */}
            <div className="flex justify-center items-center">
              <ProjectCardDialog />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
