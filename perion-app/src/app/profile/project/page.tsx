'use client'
import { CreateBoxPorto } from '@/components/portofolio/boxPorto'
import CardProject  from '@/components/project/cardProject'
import ProjectDialog from '@/components/project/modalProject'
import { useState } from 'react'

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className="flex items-center gap-5">
      <CreateBoxPorto />
      <CardProject onOpen={toggleModal} />
      {isOpen && <ProjectDialog open={isOpen} handleOpen={toggleModal} />}
    </div>
  )
}
