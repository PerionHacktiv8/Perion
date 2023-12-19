'use client'
import ProjectFormDialog from '@/components/project/projectForm'
import CardProject from '@/components/project/cardProject'
import CardProjectForm from '@/components/project/createProjectCard'
import ProjectDialog from '@/components/project/modalProject'
import { useState } from 'react'

export default function Profile() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isProjectOpen, setIsProjectOpen] = useState(false)

  const toggleFormModal = () => setIsFormOpen(!isFormOpen)

  const toggleProjectModal = () => setIsProjectOpen(!isProjectOpen)

  return (
    <div className="flex items-center gap-5">
      <CardProjectForm onOpen={toggleFormModal} />
      {isFormOpen && (
        <ProjectFormDialog open={isFormOpen} handleOpen={toggleFormModal} />
      )}

      <CardProject onOpen={toggleProjectModal} />
      {isProjectOpen && (
        <ProjectDialog open={isProjectOpen} handleOpen={toggleProjectModal} />
      )}
    </div>
  )
}
