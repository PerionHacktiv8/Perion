'use client'

import { Button } from '@material-tailwind/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function ProfileNav({ subs }: { subs: boolean }) {
  const path = usePathname().split('profile/')[1]

  return (
    <div className="flex items-center w-fit bg-white p-3 rounded-md  gap-4 mt-0">
      {subs && (
        <Link href={'/profile/project'}>
          <Button
            placeholder={''}
            variant={path.includes('project') ? 'gradient' : 'outlined'}
            className="rounded-full"
          >
            Project
          </Button>
        </Link>
      )}
      <Link href={'/profile/portofolio'}>
        <Button
          placeholder={''}
          variant={path.includes('portofolio') ? 'gradient' : 'outlined'}
          className="rounded-full"
        >
          Portfolio
        </Button>
      </Link>
      <Link href={'/profile/recommendation'}>
        <Button
          placeholder={''}
          variant={path.includes('recommendation') ? 'gradient' : 'outlined'}
          className="rounded-full"
        >
          Job Suggestion
        </Button>
      </Link>
    </div>
  )
}
