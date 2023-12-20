'use client'

import React, { useEffect, useState } from 'react'
import { CardComponent } from '@/components/card/cardComponent'
import { ProjectModel } from '@/db/models/project'
import { ResponseAPIType } from '@/app/api/user/route'
import { AppliersModel } from '@/db/models/appliers'

export default function RecomPage() {
  const [data, setData] = useState<ProjectModel[]>()

  const fetchData = async () => {
    const res = await fetch('http://localhost:3000/api/projects/apply')
    const resJson = (await res.json()) as ResponseAPIType<AppliersModel[]>

    if (res && resJson.data) {
      const data = resJson.data.map((el) => el.projectInfo) as ProjectModel[]
      console.log(resJson.data)

      setData(data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="h-full w-full grid grid-cols-3 mt-5 gap-5">
      {data && data?.length > 0 ? (
        data.map((datum) => <CardComponent datum={datum} />)
      ) : (
        <h2 className="font-bold text-white text-md">
          You Haven't Applied On Any Project Yet
        </h2>
      )}
    </div>
  )
}
