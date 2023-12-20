import { Button } from '@material-tailwind/react'
import { ObjectId } from 'mongodb'

type Props = {
  _id: ObjectId
  fetchData: () => void
}

export const ButtonDeletePortfolio = ({ _id, fetchData }: Props) => {
  const deleteProject = async () => {
    await fetch(`http://localhost:3000/api/portfolios`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id,
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
