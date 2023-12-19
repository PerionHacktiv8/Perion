'use client'

import ProjectFormDialog from '@/components/project/projectForm'
import CardProject from '@/components/project/cardProject'
import CardProjectForm from '@/components/project/createProjectCard'
import ProjectDialog from '@/components/project/modalProject'
import { useEffect, useState } from 'react'
import { ProjectModel } from '@/db/models/project'
import { ResponseAPIType } from '@/app/api/user/route'

export default function Profile() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isProjectOpen, setIsProjectOpen] = useState(false)
  const [data, setData] = useState<ProjectModel[]>()

  const toggleFormModal = () => setIsFormOpen(!isFormOpen)

  const toggleProjectModal = () => setIsProjectOpen(!isProjectOpen)

  const fetchData = async () => {
    const res = await fetch('http://localhost:3000/api/user/project')
    const resJson = (await res.json()) as ResponseAPIType<ProjectModel[]>

    if (res && resJson && resJson.data) setData(resJson.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="grid grid-cols-3 overflow-auto gap-3 mt-5 items-center">
      <CardProjectForm onOpen={toggleFormModal} />
      {isFormOpen && (
        <ProjectFormDialog open={isFormOpen} handleOpen={toggleFormModal} />
      )}

      {data &&
        data.map((datum) => (
          <>
            <CardProject onOpen={toggleProjectModal} />
          </>
        ))}

      <ProjectDialog open={isProjectOpen} handleOpen={toggleProjectModal} />
    </div>
  )
}
