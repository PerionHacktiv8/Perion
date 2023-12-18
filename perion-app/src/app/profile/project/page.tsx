'use client'
import { CreateBoxPorto } from '@/components/portofolio/boxPorto'
import { CreateBox } from '@/components/project/boxProject'
import { CardProject } from '@/components/project/cardProject'
import { ProfileCard } from '@/components/profile/profileCard'
import { ProfileNav } from '@/components/profile/profileNav'

export default function Profile() {
  return (
    <div className="flex items-center gap-5">
      <CreateBox />
      <CardProject />
    </div>
  )
}
