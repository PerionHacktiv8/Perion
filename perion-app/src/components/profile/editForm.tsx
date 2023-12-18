'use client'

import { Avatar, Button, Input, Textarea } from '@material-tailwind/react'
import { DateInput } from '../datePicker'
import { useEffect, useState } from 'react'
import { UserModel } from '@/db/models/user'
import { ResponseAPIType } from '@/app/api/user/route'

export function EditForm() {
  const [profData, setProfData] = useState<UserModel>()
  const [preview, setPreview] = useState<string>()

  const profile = async () => {
    const res = await fetch('http://localhost:3000/api/user')
    const resJson = (await res.json()) as ResponseAPIType<UserModel>

    if (resJson && resJson.data) {
      setProfData(resJson.data)
    }
  }

  useEffect(() => {
    profile()
  }, [])

  return (
    <div className="p-5">
      <form className="flex flex-col gap-2 mb-5">
        <div className="flex items-center gap-4">
          <Avatar
            placeholder={''}
            src={preview || (profData && (profData.picture as string))}
            alt="avatar"
            size="xl"
          />
          <div>
            <p className="text-gray-700 py-3 font-bold">Change Avatar</p>
            <input
              type="file"
              className="file-input file-input-sm file-input-ghost w-full max-w-xs"
              onChange={(e) => {
                e.target.files &&
                  setProfData(
                    profData && {
                      ...profData,
                      picture: e.target.files[0],
                    },
                  )
                e.target.files &&
                  setPreview(URL.createObjectURL(e.target.files[0]))
              }}
            />
          </div>
        </div>
        <div className="w-full">
          <p className="text-gray-700 py-3 font-bold">Full Name</p>
          <Input
            crossOrigin={''}
            value={profData?.name}
            label="Insert Full Name"
            onChange={(e) => {
              setProfData(profData && { ...profData, name: e.target.value })
            }}
          />
        </div>
        <div className="w-full">
          <p className="text-gray-700 py-3 font-bold">Bio</p>
          <Textarea label="Insert Bio" />
        </div>
        <div className="w-full">
          <p className="text-gray-700 py-3 font-bold">Location</p>
          <Input crossOrigin={''} label="Insert Location" />
        </div>
        <div className="w-full">
          <p className="text-gray-700 py-3 font-bold">Birth Date</p>
          <DateInput />
        </div>
        <div className="w-full">
          <p className="text-gray-700 py-3 font-bold">Upload Your CV</p>
          <input
            type="file"
            className="file-input file-input-sm file-input-ghost w-full max-w-xs"
          />
        </div>
      </form>
      <Button placeholder={''}>Update Profile</Button>
    </div>
  )
}
