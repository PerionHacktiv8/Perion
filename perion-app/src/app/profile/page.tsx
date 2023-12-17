'use client'
import { CreateBoxPorto } from '@/components/profile/boxPorto'
import { CreateBox } from '@/components/profile/boxProject'
import { ProfileCard } from '@/components/profile/profileCard'
import { ProfileNav } from '@/components/profile/profileNav'

export default function Profile() {
  return (
    <div className="container mx-auto px-4 py-8">
    <div className="flex flex-wrap -mx-4">
      
      <div className="w-full lg:w-1/4 px-4 py-7">
        <ProfileCard />
      </div>
      
      <div className="w-full lg:w-3/4 px-4 sm:py-4">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-4 lg:py-4 lg:px-32">
          <ProfileNav />
        </div>
  
        <div className="space-y-4 px-4 lg:px-32">
          <CreateBox />
          <CreateBoxPorto />
        </div>
      </div>
      
    </div>
  </div>
  
  )
}
