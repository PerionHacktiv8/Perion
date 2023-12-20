'use client'

import { ProfileCardUser } from '@/components/profile/profileCardUser'
import { ProfileNav } from '@/components/profile/profileNav'
import { useEffect, useState } from 'react'
import { UserModel } from '@/db/models/user'
import { ResponseAPIType } from '../api/user/route'

export default function Profile({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<UserModel>()

  const fetchData = async () => {
    const data = params.slug

    const res = await fetch('http://localhost:3000/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const resJson = (await res.json()) as ResponseAPIType<UserModel>

    if (resJson && resJson.data) setData(resJson.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div
      className="p-16 h-screen"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1696523844375-ad5f6177f5e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          {data && <ProfileCardUser datum={data} />}
        </div>
        {/* Main Content - Right Side */}
        <div className="lg:col-span-2">
          {/* Profile Navigation */}
          <div className="mb-4 px-32">
            {/* <ProfileNav subs={data?.subscription} /> */}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Create Box */}
            <div className="flex justify-center items-center"></div>
            <div className="flex justify-center items-center"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
