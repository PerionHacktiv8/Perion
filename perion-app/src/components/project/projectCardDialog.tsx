import React, { useState } from 'react'
import ProjectDialog from './modalProject'
import ProjectCard from './cardProject'

const ProjectCardDialog = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(!open)

  return (
    <div>
      <ProjectCard handleOpen={handleOpen} />
      {open && <ProjectDialog open={open} handleOpen={handleOpen} />}
    </div>
  )
}

export default ProjectCardDialog
