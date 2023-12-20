'use client'

import { UserModel } from '@/db/models/user'
import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Button,
} from '@material-tailwind/react'
import { format } from 'date-fns'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function ProfileCard({ profData }: { profData: UserModel }) {
  const path = usePathname().split('profile/')[1]

  console.log(profData)

  return (
    <Card placeholder={''} className="w-96 mb-10">
      <CardHeader
        placeholder={''}
        floated={false}
        className="grid grid-rows-1 place-content-center text-center shadow-none"
      >
        <Avatar
          placeholder={''}
          src={profData.picture as string}
          alt="avatar"
          size="xxl"
          className="mb-3 mx-auto"
        />
        <p color="blue-gray" className="mb-2 text-2xl font-bold">
          {profData.name}
        </p>
        <p
          color="black"
          className="flex justify-center items-center gap-2 mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
          {profData.location ? profData.location : '-'}
        </p>
        <p className="mt-3">
          Member Since : {format(new Date(profData.createdAt), 'MMMM do, yyyy')}
        </p>
        <p className="mt-3">Your Bio: {profData.bio}</p>
        {profData && profData.cvLink ? (
          <p className="mt-3 text-gray-700">
            Your current CV{' '}
            <a href={profData.cvLink} target="_blank" className="text-blue-500">
              Click Here
            </a>{' '}
          </p>
        ) : (
          <p>You didn&apos;t put your CV yet</p>
        )}
        {/* <p className="mt-3 font-semibold">Your Top 4 Skills: </p>
        {profData.cvData ? (
          profData.cvData.skills
            .slice(0, 4)
            .map((el) => <p className="mt-3">- {el}</p>)
        ) : (
          <p>Please Input Your CV to Get Your List of Skills</p>
        )} */}
      </CardHeader>
      <CardBody placeholder={''}>
        <Link
          href={
            path === 'edit-profile'
              ? '/profile/project'
              : '/profile/edit-profile'
          }
        >
          <Button
            placeholder={''}
            className="rounded-full w-full flex justify-center items-center gap-2 mx-auto mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
              <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
            </svg>
            {path !== 'edit-profile' ? 'Edit Your Profile' : 'Back To Profile'}
          </Button>
        </Link>
      </CardBody>
    </Card>
  )
}
