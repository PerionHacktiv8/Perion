'use client'
import {CreateBoxPorto} from '@/components/portofolio/boxPorto'
import { CardPortfolio}  from '@/components/portofolio/cardPorto'

export default function Portfolio() {
  return (
    <div className="flex items-center gap-5">
      <CreateBoxPorto />
      <CardPortfolio />
    </div>
  )
}
