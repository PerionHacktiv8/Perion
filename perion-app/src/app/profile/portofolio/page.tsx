'use client'
import { CreateBoxPorto } from '@/components/portofolio/boxPorto'
import { CardPortfolio } from '@/components/portofolio/cardPorto'
import { PortfolioModel } from '@/db/models/portfolio'
import { useEffect, useState } from 'react'
import { ResponseAPIType } from '@/app/api/user/route'
import useProfile from '@/utils/fetchProfile'

export default function Portfolio() {
  const [data, setData] = useState<PortfolioModel[]>()

  const fetchData = async () => {
    const res = await fetch('http://localhost:3000/api/portfolios/user')
    const resJson = (await res.json()) as ResponseAPIType<PortfolioModel[]>

    if (res && resJson && resJson.data) {
      setData(resJson.data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="grid grid-cols-3 overflow-auto gap-3 py-5 items-center">
      <CreateBoxPorto fetchData={fetchData} />
      {data?.map((datum, idx) => (
        <CardPortfolio key={idx} datum={datum} fetchData={fetchData} />
      ))}
    </div>
  )
}
