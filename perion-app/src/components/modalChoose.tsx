'use client'

import React, { useEffect, useState } from 'react'
import { Dialog, DialogHeader, DialogBody } from '@material-tailwind/react'
import { ResponseAPIType, SetupData } from '@/app/api/user/route'
import { useRouter } from 'next/navigation'

export function DialogDefault() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const firstTime = async () => {
    const res = await fetch('http://localhost:3000/api/user')
    const resJson = (await res.json()) as ResponseAPIType<SetupData>

    if (resJson && resJson.data) {
      setOpen(resJson.data.firstTime)
    }
  }

  const xendit = async () => {
    const response = await fetch('http://localhost:3000/api/invoiceXendit', {
      method: 'POST',
    })
    const data = await response.json()

    router.push(data.data)
  }

  const freeUser = async () => {
    const response = await fetch('http://localhost:3000/api/user/free', {
      method: 'POST',
    })

    firstTime()
  }

  useEffect(() => {
    firstTime()
  }, [])

  const handleOpen = () => open

  return (
    <>
      <Dialog
        placeholder={''}
        open={open}
        className=""
        handler={handleOpen}
        size={'lg'}
      >
        <DialogHeader placeholder={''} className="border-b-2">
          <p>Choose your plan.</p>
        </DialogHeader>
        <DialogBody placeholder={''}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Free</h3>
              <p className="text-gray-500 mb-4">USD $0</p>
              <button
                onClick={freeUser}
                className="bg-[#3296d9] hover:bg-[#317ada] hover:shadow-md transition-transform active:scale-95 ease-in-out duration-300 w-full py-2 rounded text-white text-sm mb-4"
              >
                Choose Plan
              </button>
              <p className="text-gray-700 mb-4">
                For people just getting started with Parion
              </p>
              <ul className="text-sm flex flex-col gap-4 text-gray-700">
                <li>✓ Unlimited messages, interactions, and history</li>
                <li>✓ Access to our Parion model</li>
                <li>✓ Access on Web, iOS, and Android</li>
              </ul>
            </div>

            {/* Plus Plan */}
            <div className=" bg-[#3296d9] p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-[#f5b530] mb-2">
                Plus
              </h3>
              <p className="text-white mb-4">USD $20</p>
              <button
                onClick={xendit}
                type="submit"
                className="bg-[#f5b530] hover:bg-[#f98435] hover:shadow-md transition-transform active:scale-95 ease-in-out duration-300 w-full py-2 rounded text-white text-sm mb-4"
              >
                Choose Plan
              </button>
              <p className="text-white mb-4">Everything in Free, and:</p>
              <ul className="flex flex-col gap-4 text-sm text-white">
                <li>✓ Access to Parion, our most capable model</li>
                <li>✓ Browse, create, and use Parion</li>
                <li>✓ Access to additional tools like DALL-E, Browsing</li>
              </ul>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  )
}
