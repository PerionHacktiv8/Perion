'use client'

import { Button } from '@material-tailwind/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function ProfileNav() {
  const path = usePathname().split('profile/')[1]

  return (
    <div className="flex items-center gap-4 mt-0">
      <Link href={'/profile/project'}>
        <Button
          placeholder={''}
          variant={path === 'project' ? 'gradient' : 'outlined'}
          className="rounded-full"
        >
          Project
        </Button>
      </Link>
      <Link href={'/profile/portofolio'}>
        <Button
          placeholder={''}
          variant={path !== 'project' ? 'gradient' : 'outlined'}
          className="rounded-full"
        >
          Portfolio
        </Button>
      </Link>
    </div>
  )
}
