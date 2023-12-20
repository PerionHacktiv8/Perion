import { Button } from '@material-tailwind/react'
import { ObjectId } from 'mongodb'

type Props = {
  id: ObjectId
  fetchData: () => void
}

export const ButtonDeleteProject = ({ id, fetchData }: Props) => {
  const deleteProject = async () => {
    await fetch(`http://localhost:3000/api/projects`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    })
    fetchData()
  }
  return (
    <div>
      <Button onClick={deleteProject} placeholder={''} color="gray" size="md">
        Delete
      </Button>
    </div>
  )
}
