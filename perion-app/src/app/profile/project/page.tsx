'use client'

import CardProjectForm from '@/components/project/createProjectCard'
import { useEffect, useState } from 'react'
import { ProjectModel } from '@/db/models/project'
import { ResponseAPIType } from '@/app/api/user/route'
import { CardComponent } from '@/components/card/cardComponent'
import { UserModel } from '@/db/models/user'

export default function Profile() {
  const [data, setData] = useState<ProjectModel[]>()
  const [recData, setRecData] = useState<UserModel[]>()

  const fetchData = async () => {
    const res = await fetch('http://localhost:3000/api/user/project')
    const resJson = (await res.json()) as ResponseAPIType<ProjectModel[]>

    if (res && resJson && resJson.data) setData(resJson.data)
  }

  const fetchRec = async () => {
    const res = await fetch('http://localhost:3000/api/recommendation/project')
    const resJson = (await res.json()) as ResponseAPIType<UserModel[]>

    if (res && resJson && resJson.data) {
      setRecData(resJson.data)
    }
  }

  useEffect(() => {
    fetchData()
    fetchRec()
  }, [])

  return (
    <div className="grid grid-cols-3 overflow-auto gap-3 py-5 items-center">
      <CardProjectForm fetchData={fetchData} />

      {data &&
        data.map((datum, idx) => (
          <CardComponent key={idx} datum={datum} rec={recData} />
        ))}
    </div>
  )
}
