'use client'
import { Avatar, Card, Input, Textarea } from '@material-tailwind/react'
import { DateInput } from '../datePicker'

export function EditForm() {
  return (
    <div className="w-full h-full p-5">
      <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <Avatar placeholder={''} src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" size="xxl" />
        <div>
          <p className="text-gray-500 py-3 font-bold">Change Avatar</p>
          <p className="">Tania Andrew</p>
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
      </div>
    </div>
  )
}
