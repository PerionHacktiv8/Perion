'use client'
import { Avatar, Button, Input, Textarea } from '@material-tailwind/react'
import { DateInput } from '../datePicker'

export function EditForm() {
  return (
    <div className="p-5">
      <div className="flex flex-col gap-2 mb-5">
        <div className="flex items-center gap-4">
          <Avatar
            placeholder={''}
            src="https://docs.material-tailwind.com/img/face-3.jpg"
            alt="avatar"
            size="xxl"
          />
          <div>
            <p className="text-gray-500 py-3 font-bold">Change Avatar</p>
            <input
              type="file"
              className="file-input file-input-sm file-input-ghost w-full max-w-xs"
            />
          </div>
        </div>
        <div className="w-full">
          <p className="text-gray-500 py-3 font-bold">Full Name</p>
          <Input crossOrigin={''} label="Insert Full Name" />
        </div>
        <div className="w-full">
          <p className="text-gray-500 py-3 font-bold">Bio</p>
          <Textarea label="Insert Bio" />
        </div>
        <div className="w-full">
          <p className="text-gray-500 py-3 font-bold">Location</p>
          <Input crossOrigin={''} label="Insert Location" />
        </div>
        <div className="w-full">
          <p className="text-gray-500 py-3 font-bold">Birth Date</p>
          <DateInput />
        </div>
        <div className="w-full">
          <p className="text-gray-500 py-3 font-bold">Upload Your CV</p>
          <input
            type="file"
            className="file-input file-input-sm file-input-ghost w-full max-w-xs"
          />
        </div>
      </div>
      <Button placeholder={''}>Update Profile</Button>
    </div>
  )
}
