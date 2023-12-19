'use client'
import React from 'react'
import Image from 'next/image'

const ProjectCard = ({ handleOpen }) => {
  return (
    <div
      className="w-full sm:w-80 h-52 relative cursor-pointer"
      onClick={handleOpen}
    >
      <Image
        src="https://static.vecteezy.com/system/resources/previews/004/965/420/non_2x/deer-in-the-forest-beautiful-sunset-scenery-illustration-free-vector.jpg"
        alt="Placeholder"
        className="w-full h-full object-cover rounded-lg"
        layout="fill" // Changed to fill to make it responsive to the container's width and height
      />
      <div className="absolute bottom-0 w-full h-1/2 bg-black bg-opacity-10 flex items-center px-5 opacity-0 rounded-lg hover:opacity-100 transition-opacity duration-300">
        <div className="flex flex-col gap-2 w-full">
          <p className="text-white text-xl font-bold">Ini judul</p>
          <div className="flex justify-between">
            <span className="text-white text-sm">Ini author</span>
            <span className="text-white text-sm">December 2023</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
