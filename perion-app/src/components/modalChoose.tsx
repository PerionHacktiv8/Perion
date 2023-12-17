'use client'
import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Card,
  CardBody,
  CardFooter,
} from '@material-tailwind/react'
import { ResponseAPIType, SetupData } from '@/app/api/user/route'

export function DialogDefault() {
  const [open, setOpen] = useState(false)

  const firstTime = async () => {
    const res = await fetch('http://localhost:3000/api/user')
    const resJson = (await res.json()) as ResponseAPIType<SetupData>

    if (resJson && resJson.data) {
      setOpen(resJson.data.firstTime)
    }
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
        handler={handleOpen}
        size={'xl'}
        className="h-[35rem]"
      >
        <DialogHeader placeholder={''}>Its a simple dialog.</DialogHeader>
        <DialogBody placeholder={''}>
          <div className="flex justify-center items-center mt-20 md:h-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full md:w-3/4 lg:w-3/5">
              <section>
                {/* Card 1 */}
                <Card placeholder={''} className="w-full flex items-center">
                  <CardBody placeholder={''}>
                    <h5 className="mb-2 font-bold text-xl text-center">
                      UI/UX Review Check
                    </h5>
                    <p>
                      The place is close to Barceloneta Beach and bus stop just
                      2 min by walk and near to &quot;Naviglio&quot; where you
                      can enjoy the main night life in Barcelona.
                    </p>
                  </CardBody>
                  <CardFooter placeholder={''} className="pt-0">
                    <Button placeholder={''}>Choose</Button>
                  </CardFooter>
                </Card>
              </section>
              <section>
                {/* Card 2 */}
                <Card placeholder={''} className="w-full flex items-center">
                  <CardBody placeholder={''}>
                    <h5 className="mb-2 font-bold text-xl text-center">
                      UI/UX Review Check
                    </h5>
                    <p>
                      The place is close to Barceloneta Beach and bus stop just
                      2 min by walk and near to &quot;Naviglio&quot; where you
                      can enjoy the main night life in Barcelona.
                    </p>
                  </CardBody>
                  <CardFooter placeholder={''} className="pt-0">
                    <Button placeholder={''}>Choose</Button>
                  </CardFooter>
                </Card>
              </section>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  )
}
