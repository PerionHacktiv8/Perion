'use client'
import Image from 'next/image'
import React from 'react'

const CardProject = ({ onOpen } : {onOpen : () => void}) => {
  return (
    <div onClick={onOpen} className="relative w-80 h-52">
      <Image
        src="https://static.vecteezy.com/system/resources/previews/004/965/420/non_2x/deer-in-the-forest-beautiful-sunset-scenery-illustration-free-vector.jpg"
        alt="Placeholder"
        className="w-full h-full object-cover rounded-lg"
        width={200}
        height={200}
      />
      <div className="absolute bottom-0 w-full h-1/2 bg-black bg-opacity-10 flex items-center px-5 opacity-0 rounded hover:opacity-100 transition-opacity duration-300">
        <div className="flex flex-col gap-2 w-full">
          <div className="">
            <p className="text-white text-xl font-bold">Ini judul</p>
          </div>
          <div className="flex justify-between">
            <div className="text-white text-sm">Ini author</div>
            <div className="text-white text-sm">December 2023</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardProject;