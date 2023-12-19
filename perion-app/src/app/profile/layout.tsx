'use client'

import { ProfileCard } from '@/components/profile/profileCard'
import { ProfileNav } from '@/components/profile/profileNav'
import { UserModel } from '@/db/models/user'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ResponseAPIType } from '../api/user/route'

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const path = usePathname().split('profile/')[1]

  const [profData, setProfData] = useState<UserModel>()

  const profile = async () => {
    const res = await fetch('http://localhost:3000/api/user')
    const resJson = (await res.json()) as ResponseAPIType<UserModel>

    if (res && resJson && resJson.data) {
      setProfData(resJson.data)
    }
  }

  useEffect(() => {
    profile()
  }, [])

  return (
    <article
      className="flex h-screen bg-[center] items-center"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1696523844375-ad5f6177f5e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      }}
    >
      <div className="w-1/3 h-full flex items-center ml-10">
        <div className="w-full">
          {profData && <ProfileCard profData={profData} />}
        </div>
      </div>
      <div className="flex flex-col h-[85%] p-5 w-3/4 mr-5">
        {path !== 'edit-profile' && profData && (
          <ProfileNav subs={profData.subscription} />
        )}
        {children}
      </div>
    </article>
  )
}
