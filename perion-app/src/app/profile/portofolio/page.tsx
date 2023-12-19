'use client'
import CreateBoxPorto from '@/components/portofolio/boxPorto'
import PortfolioForm from '@/components/portofolio/portoForm'
import { useState } from 'react'

export default function Portfolio() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  const toggleFormModal = () => setIsFormOpen(!isFormOpen)
  return (
    <div className="">
      <CreateBoxPorto onOpen={toggleFormModal} />
      {isFormOpen && (
        <PortfolioForm open={isFormOpen} handleOpen={toggleFormModal} />
      )}
    </div>
  )
}
