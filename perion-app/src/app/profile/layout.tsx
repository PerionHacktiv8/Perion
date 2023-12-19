'use client'

import { ProfileCard } from '@/components/profile/profileCard'
import { ProfileNav } from '@/components/profile/profileNav'
import { usePathname } from 'next/navigation'

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const path = usePathname().split('profile/')[1]

  return (
    <article
      className="flex h-screen items-center"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1702116231095-dc3c24b545f4?q=80&w=2066&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      }}
    >
      <div className="w-1/3 h-full flex items-center ml-10">
        <div className="w-full">
          <ProfileCard />
        </div>
      </div>
      <div className="flex flex-col h-[85%] p-5 w-3/4 mr-5">
        {path !== 'edit-profile' && <ProfileNav />}
        {children}
      </div>
    </article>
  )
}
