'use client'

import { Avatar, Button, Input, Textarea } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { UserModel } from '@/db/models/user'
import { ResponseAPIType } from '@/app/api/user/route'
import { ProfilesModel } from '@/db/models/profiles'

export function EditForm() {
  const [profData, setProfData] = useState<UserModel>()
  const [preview, setPreview] = useState<string>()
  const [image, setImage] = useState<File>()
  const [pdf, setPdf] = useState<File>()

  const profile = async () => {
    const res = await fetch('http://localhost:3000/api/user')
    const resJson = (await res.json()) as ResponseAPIType<UserModel>

    if (resJson && resJson.data) {
      setProfData(resJson.data)
    }
  }

  const updateProfile = async () => {
    const res = await fetch('http://localhost:3000/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profData),
    })
  }

  const updateImage = async () => {
    const body = new FormData()
    if (image) body.append('image', image)

    const res = await fetch('http://localhost:3000/api/image', {
      method: 'POST',
      body: body,
    })
  }

  const updatePDF = async () => {
    const body = new FormData()
    if (pdf) body.append('pdf', pdf)

    const res = await fetch('http://localhost:3000/api/pdf', {
      method: 'POST',
      body: body,
    })
  }

  useEffect(() => {
    profile()
  }, [])

  return (
    <div className="p-5">
      <form
        action={() => {
          updateImage()
          updatePDF()
          updateProfile()
        }}
        className="flex flex-col gap-2 mb-5"
      >
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
                e.target.files && setImage(e.target.files[0])
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
          <Textarea
            label="Insert Bio"
            value={profData && profData?.bio}
            onChange={(e) => {
              setProfData(profData && { ...profData, bio: e.target.value })
            }}
          />
        </div>
        <div className="w-full">
          <p className="text-gray-700 py-3 font-bold">Location</p>
          <Input
            crossOrigin={''}
            label="Insert Location"
            value={profData && profData?.location}
            onChange={(e) => {
              setProfData(profData && { ...profData, location: e.target.value })
            }}
          />
        </div>
        <div className="w-full">
          {profData && profData.cvLink && <p>Your current CV</p>}
          <p className="text-gray-700 py-3 font-bold">Upload Your CV</p>
          <input
            type="file"
            // accept="application/pdf"
            onChange={(e) => {
              e.target.files && setPdf(e.target.files[0])
            }}
            className="file-input file-input-sm file-input-ghost w-full max-w-xs"
          />
        </div>
        <Button type="submit" className="mt-3" placeholder={''}>
          Update Profile
        </Button>
      </form>
    </div>
  )
}
