'use client'
import CardProject from '@/components/project/cardProject'
import CardProjectForm from '@/components/project/createProjectCard'

export default function Profile() {
  return (
    <div className="flex items-center gap-5">
      <CardProjectForm />

      <CardProject />
    </div>
  )
}
