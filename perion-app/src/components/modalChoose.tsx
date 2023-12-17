'use client'
import React from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  CardBody,
  CardFooter,
} from '@material-tailwind/react'

export function DialogDefault() {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(!open)

  return (
    <>
      <Button placeholder={''} onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button>
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
