'use client'
import React, { useState } from 'react'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from '@material-tailwind/react'
import Image from 'next/image'
import { RequirementCard } from './cardRequirement'
import { CarouselProject } from '../carousel'

export function CardComponent() {
  const [liked, setLiked] = useState(false)

  const handleLikeButtonClick = () => {
    setLiked((prevLiked) => !prevLiked)
  }

  const [open, setOpen] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
 
  const handleOpen = () => setOpen((cur) => !cur);
  const handleIsFavorite = () => setIsFavorite((cur) => !cur);

  return (
    <>
    <Card
      placeholder={''}
      className="max-w-[24rem] overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl"
      onClick={handleOpen}
    >
      <CardHeader
        placeholder={''}
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <div className="relative h-56 w-full">
          <Image
            src="https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="ui/ux review check"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <IconButton
          placeholder={''}
          color={liked ? 'orange' : 'white'}
          size="lg"
          variant="text"
          className="!absolute top-4 right-4 rounded-full"
          onClick={handleLikeButtonClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
              clip-rule="evenodd"
            />
          </svg>
        </IconButton>
      </CardHeader>
      <CardBody placeholder={''}>
        <Typography placeholder={''} className="font-normal mb-2">
          Des 2023
        </Typography>
        <Typography
          placeholder={''}
          variant="h4"
          color="blue-gray"
          className="truncate"
        >
          Parion Game App Project
        </Typography>
        <Typography
          placeholder={''}
          variant="h6"
          color="blue-gray"
          className="mt-3"
        >
          Game Development
        </Typography>
        <Typography
          placeholder={''}
          variant="paragraph"
          color="gray"
          className="font-normal line-clamp-3"
        >
          Because it&apos;s about motivating the doers. Because I&apos;m here to
          follow my dreams and inspire others. Because it&apos;s about
          motivating the doers. Because I&apos;m here to follow my dreams and
          inspire others. Because it&apos;s about motivating the doers. Because
          I&apos;m here to follow my dreams and inspire others.
        </Typography>
      </CardBody>
      <CardFooter
        placeholder={''}
        className="flex items-center justify-between"
      >
        <div className="flex items-center -space-x-3">
          <Tooltip content="Natali Craig">
            <Avatar
              placeholder={''}
              size="sm"
              variant="circular"
              alt="natali craig"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
              className="border-2 border-white hover:z-10"
            />
          </Tooltip>
          <Tooltip content="Tania Andrew">
            <Avatar
              placeholder={''}
              size="sm"
              variant="circular"
              alt="tania andrew"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              className="border-2 border-white hover:z-10"
            />
          </Tooltip>
          <Typography placeholder={''} className="font-normal pl-6">
            Parion Team
          </Typography>
        </div>
      </CardFooter>
    </Card>
    <Dialog placeholder={''} size="xl" open={open} handler={handleOpen} className='overflow-y-auto'>
    <DialogHeader placeholder={''} className="justify-between mt-2 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div className="flex items-center gap-3">
        <Avatar
          placeholder={''}
          size="md"
          variant="circular"
          alt="tania andrew"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        />
        <div className="-mt-px flex flex-col">
          <Typography
            placeholder={''}
            variant="small"
            color="blue-gray"
            className="font-bold"
          >
            Tania Andrew
          </Typography>
          <Typography
            placeholder={''}
            variant="small"
            color="gray"
            className="text-xs font-normal"
          >
            @emmaroberts
          </Typography>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className='flex flex-col items-center'>
          <h5>Parion - Pair Your Passion</h5>
          <div className='flex flex-row gap-2'>
            <p className='font-normal text-sm'>Software Development</p>
            <span className='font-normal text-sm'>-</span>
            <p className='font-normal text-sm'>Web Applications</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button placeholder={''} color="white" size="sm" className='hover:bg-gray-100 border-2 flex items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
          </svg>
          <span>Save Project</span>
        </Button>
      </div>
    </DialogHeader>
    <DialogBody placeholder={''} className="h-[37rem] sm:h-[30rem] md:h-[35rem] lg:h-[37rem] overflow-y-auto">
      <CarouselProject/>
      <div className='px-4 py-16'>
        <h1 className='text-4xl font-bold text-black'>Parion - Pair Your Passion</h1>
        <hr className='border-b-2 mt-5' />
        <div className='py-12 grid grid-cols-2'>
          <section className=''>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dapibus, quam vel luctus mollis, mauris orci mollis tortor, in hendrerit urna dui vel neque. Aenean mi risus, aliquam nec metus quis, pharetra venenatis lorem. Aliquam eleifend facilisis est, id laoreet nibh semper nec. Aliquam varius eros ac molestie dignissim. Quisque lorem tellus, ultrices quis ex ut, consectetur laoreet dolor. Suspendisse dictum dolor sed neque iaculis, ac sagittis eros vehicula. Morbi iaculis risus ac elit ornare, a auctor libero commodo. Duis eget purus gravida, mattis nunc a, luctus ipsum. Sed facilisis at ligula sit amet pulvinar. Nulla elementum consequat posuere. Morbi lobortis nulla sed aliquam aliquam. Fusce rhoncus leo nibh, mattis fermentum nisl suscipit sit amet. Nulla tempus arcu id ornare euismod. Pellentesque magna est, semper in elementum vitae, sodales eget ex. Vestibulum ut lectus varius, tempus nisi posuere, lobortis tortor.
            <br/>
            <br/>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla vel elementum diam. Nullam id dolor leo. Integer erat est, fringilla vel ligula id, dictum ornare orci. Mauris accumsan finibus enim facilisis sodales. Phasellus pharetra eget dui eget vehicula. Morbi eu vulputate purus. Praesent ultricies, libero a maximus sagittis, quam nunc venenatis dolor, ac commodo nunc arcu ut mauris. Fusce tellus leo, faucibus eu condimentum a, ornare in lectus. Ut aliquet tempor rhoncus. Donec a placerat lacus, tincidunt rhoncus velit. Sed et volutpat orci, ut luctus magna. Proin efficitur luctus ex. Aliquam erat volutpat.
            <br/>
            <br/>
            Aenean diam lorem, ultricies ac iaculis sit amet, aliquet non justo. Fusce a auctor mauris, quis cursus nisi. Integer egestas orci ut tempus molestie. Aenean consectetur scelerisque cursus. Cras vestibulum nulla in libero sagittis, at venenatis ipsum pellentesque. Aenean sem ex, tincidunt quis elit sed, molestie laoreet nisl. Nam non est efficitur, elementum justo eget, vehicula risus. Suspendisse potenti. Etiam sit amet magna rhoncus, congue risus sed, fermentum augue.
            <br/>
            <br/>
            Nullam sed aliquam enim. Duis a leo magna. Curabitur quis facilisis augue. Integer tincidunt accumsan risus, eget pretium felis efficitur eget. Duis sem quam, vestibulum ut tortor id, tincidunt posuere erat. Vivamus tempus diam a urna lobortis, id convallis nisl tempus. Vestibulum sed nulla ultricies, aliquam magna ac, convallis libero.
            </p>
          </section>
          <section className='pl-36'>
            <RequirementCard/>
          </section>
        </div>
      </div>
    </DialogBody>
    <DialogFooter placeholder={''} className="justify-between flex flex-col lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-16">
        <div>
          <Typography placeholder={''} variant="small" color="gray" className="font-normal">
            Project Posted:
          </Typography>
          <Typography placeholder={''} color="blue-gray" className="font-medium">
            December 2023
          </Typography>
        </div>
        <div>
          <Typography placeholder={''} variant="small" color="gray" className="font-normal">
            Project Team : 
          </Typography>
          <Typography placeholder={''} color="blue-gray" className="font-medium">
            Parion
          </Typography>
        </div>
      </div>
        <Button placeholder={''} color="gray" size="md">
          Join Project
        </Button>
    </DialogFooter>
  </Dialog>
  </>
  )
}
