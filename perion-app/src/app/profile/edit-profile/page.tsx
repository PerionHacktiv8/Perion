'use client'
import { EditForm } from '@/components/profile/editForm'
import { useRouter } from 'next/navigation'

export default function Portfolio() {
  const router = useRouter()

  return (
    <div className="bg-white rounded-lg">
      <EditForm router={router} />
    </div>
  )
}
