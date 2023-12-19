'use client'
import { CreateBoxPorto } from '@/components/portofolio/boxPorto'
import { CreateProjectCard } from '@/components/project/createProjectCard'
import { ProfileCard } from '@/components/profile/profileCard'
import { ProfileNav } from '@/components/profile/profileNav'
import { CardProject } from '@/components/project/cardProject'

export default function Profile() {
  return (
    <div className="flex items-center gap-5">
      <CreateBoxPorto />
      <CardProject />
    </div>
  )
}
