import { Button } from '@material-tailwind/react'
import Link from 'next/link'

export function ProfileNav() {
  return (
    <div className="flex items-center gap-4 mt-0">
      <Link href={'/profile/project'}>
        <Button placeholder={''} variant="gradient" className="rounded-full">
          Project
        </Button>
      </Link>
      <Link href={'/profile/portofolio'}>
        <Button placeholder={''} variant="outlined" className="rounded-full">
          Portfolio
        </Button>
      </Link>
    </div>
  )
}
