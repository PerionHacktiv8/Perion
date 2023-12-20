'use client'
import { PortfolioModel } from '@/db/models/portofolios'
import { format } from 'date-fns'
import Image from 'next/image'
import React from 'react'

export function CardPortoPage({ datum }: { datum: PortfolioModel }) {
  const date = new Date()

  return (
    <div className="relative w-80 h-52">
      <img
        src={datum.thumbnail}
        alt="Placeholder"
        className="w-full h-full object-cover rounded-lg"
        width={200}
        height={200}
      />
      <div className="absolute bottom-0 w-full h-1/2 bg-black bg-opacity-10 flex items-center px-5 opacity-0 rounded hover:opacity-100 transition-opacity duration-300">
        <div className="flex flex-col gap-2 w-full">
          <div className="">
            <p className="text-white text-xl font-bold">{datum.title}</p>
          </div>
          <div className="flex justify-between">
            <div className="text-white text-sm">Ini author</div>
            <div className="text-white text-sm">
              {format(date, 'MMMM do, yyyy')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
