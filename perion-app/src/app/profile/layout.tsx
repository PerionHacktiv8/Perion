'use client'

import { ProfileCard } from '@/components/profile/profileCard'
import { ProfileNav } from '@/components/profile/profileNav'
import { usePathname } from 'next/navigation'
import useProfile from '@/utils/fetchProfile'
// import { profile } from '@/utils/fetchProfile'

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const path = usePathname().split('profile/')[1]

  const { profData } = useProfile()

  return (
    <article
      className="flex h-screen bg-[center] items-center"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      }}
    >
      {profData && (
        <>
          <div className="w-1/3 h-full flex items-center ml-10">
            <div className="w-full">
              {profData && <ProfileCard profData={profData} />}
            </div>
          </div>
          <div className="flex flex-col h-[85%] rounded-md p-5 w-3/4 mr-5">
            {path !== 'edit-profile' && profData && (
              <ProfileNav subs={profData.subscription} />
            )}
            <div className="overflow-auto h-full">{children}</div>
          </div>
        </>
      )}
    </article>
  )
}
