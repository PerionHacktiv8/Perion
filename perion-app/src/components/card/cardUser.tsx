'use client'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Avatar,
} from '@material-tailwind/react'

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-3 w-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  )
}

export function CardUser() {
  return (
      <Card
        placeholder={''}
        color="gray"
        variant="gradient"
        className="w-full max-w-sm md:max-w-md transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl mb-5"
      >
        <CardHeader
          placeholder={''}
          color="transparent"
          className="border-0 p-4 text-center h-40"
          style={{
            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/previews/002/312/383/non_2x/highway-road-mountain-free-vector.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
        </CardHeader>
        <div className="-mt-9 flex justify-center">
            <Avatar
                placeholder={""}
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
                size="xl"
                className="align-middle border-2 shadow-lg" 
            />
        </div>
        <CardBody placeholder={''} className="flex flex-col gap-2 p-4">
        <div className="flex flex-col gap-2 justify-center items-center mb-4">
              <Typography
                placeholder={''}
                variant="h5"
                color="white"
                className="font-bold"
              >
                Naufal Rafi
              </Typography>
              <Typography
                placeholder={''}
                variant="small"
                color="white"
                className="flex items-center gap-2"
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
                Jakarta, Indonesia
              </Typography>
          </div>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <Typography placeholder={''} className="font-normal">
                Full Time Project
              </Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <Typography placeholder={''} className="font-normal">
                0 Projects
              </Typography>
            </li>
          </ul>
        </CardBody>
        <CardFooter placeholder={''} className="flex justify-center p-4">
          <Button
            placeholder={''}
            size="lg"
            color="white"
            className="hover:bg-black hover:text-white"
          >
            Hire Naufal Rafi
          </Button>
        </CardFooter>
      </Card>
  )
}
