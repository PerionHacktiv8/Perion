import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Button,
} from '@material-tailwind/react'
import Image from 'next/image'

export function ProfileCard() {
  return (
    <Card placeholder={''} className="w-96 mb-10">
      <CardHeader
        placeholder={''}
        floated={false}
        className="grid grid-rows-1 place-content-center text-center shadow-none"
      >
        <Avatar
          placeholder={''}
          src="https://docs.material-tailwind.com/img/face-3.jpg"
          alt="avatar"
          size="xxl"
          className="mb-3 mx-auto"
        />
        <Typography
          placeholder={''}
          variant="h4"
          color="blue-gray"
          className="mb-2"
        >
          Natalie Paisley
        </Typography>
        <Typography
          placeholder={''}
          variant="small"
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
          Jakarta, Indonesia
        </Typography>
        <Typography
          placeholder={''}
          variant="small"
          color="black"
          className="mt-3"
        >
          Member Since : 16 December 2023
        </Typography>
      </CardHeader>
      <CardBody placeholder={''}>
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
          Edit Your Profile
        </Button>
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
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
              clip-rule="evenodd"
            />
          </svg>
          Follow
        </Button>
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
            <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
            <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
          </svg>
          Message
        </Button>
      </CardBody>
      <CardFooter placeholder={''} className="flex justify-center gap-7 pt-2">
        <div className="bg-white rounded-lg p-6 shadow-md max-w-sm mx-auto w-full">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Hire Naufal
          </h2>

          <div className="border-t-2 border-gray-200 my-3"></div>

          {/* Full Time Job Option */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="inline-block p-2 text-blue-500 rounded mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                  />
                </svg>
              </span>
              Full Time Job
            </div>
            <span className="inline-block p-2 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </div>

          <div className="border-t-2 border-gray-200 my-3"></div>

          {/* Freelance / Project Option */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="inline-block p-2 text-gray-500 rounded mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              Freelance/Project
            </div>
            <span className="inline-block p-2 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </div>
        </div>
      </CardFooter>

      {/* Work Experience */}
      <CardFooter placeholder={''} className="flex justify-start gap-7">
        <div className="">
          <Typography
            placeholder={''}
            variant="h5"
            className="font-bold text-sm"
          >
            WORK EXPERIENCE
          </Typography>
          <div className="mt-4">
            <Typography placeholder={''} className="font-bold">
              Digital Artist & Graphic Designer
            </Typography>
            <Typography placeholder={''} className="text-sm text-gray-600">
              Freelance — Dessau, Germany
            </Typography>
          </div>
          <div className="mt-4">
            <Typography placeholder={''} className="font-bold">
              Digital Artist & Graphic Designer
            </Typography>
            <Typography placeholder={''} className="text-sm text-gray-600">
              Freelance — Dessau, Germany
            </Typography>
          </div>
          <div className="mt-4">
            <Typography placeholder={''} className="font-bold">
              Digital Artist & Graphic Designer
            </Typography>
            <Typography placeholder={''} className="text-sm text-gray-600">
              Freelance — Dessau, Germany
            </Typography>
          </div>
          <div className="mt-4 flex items-center">
            <a
              href="#"
              className="text-gray-600 hover:underline text-sm flex items-center"
            >
              View Full Resume
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-4 h-4 ml-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </a>
          </div>
        </div>
      </CardFooter>

      {/* Teams */}
      <CardFooter placeholder={''} className="flex justify-start gap-7 w-full">
        <div className="w-full">
          <Typography
            placeholder={''}
            variant="h5"
            className="font-bold text-sm mb-3"
          >
            TEAMS
          </Typography>
          <div className="rounded-md border border-2 w-full p-2">
            {/* Team 1 */}
            <div className="flex items-center">
              <div className="flex items-center">
                <Image
                  src="https://ik.imagekit.io/naufalrafi/Parion%20Logo%20(1).png?updatedAt=1702368775661"
                  alt="Parion"
                  className="w-10 h-10 rounded-full mr-2"
                  width={50}
                  height={50}
                />
                <div>
                  <Typography placeholder={''} className="font-medium">
                    Parion Teams
                  </Typography>
                  <Typography
                    placeholder={''}
                    className="text-sm text-gray-600"
                  >
                    Tangerang, Indonesia
                  </Typography>
                </div>
              </div>
            </div>
            <div className="border-t-2 border-gray-200 my-3"></div>
            {/* Team 2 */}
            <div className="flex items-center">
              <div className="flex items-center">
                <Image
                  src="https://ik.imagekit.io/naufalrafi/Parion%20Logo%20(1).png?updatedAt=1702368775661"
                  alt="Parion"
                  className="w-10 h-10 rounded-full mr-2"
                  width={50}
                  height={50}
                />
                <div>
                  <Typography placeholder={''} className="font-medium">
                    Parion Teams
                  </Typography>
                  <Typography
                    placeholder={''}
                    className="text-sm text-gray-600"
                  >
                    Tangerang, Indonesia
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardFooter>

      <CardFooter placeholder={''} className="flex justify-start gap-7 w-full">
        <div className="w-full">
          <Typography
            placeholder={''}
            variant="h5"
            className="font-bold text-sm mb-3"
          >
            Website Links
          </Typography>
          <div className="rounded-md border border-gray-200 w-full p-2">
            <div className="flex flex-col">
              <a href="#link1" className="text-gray-500 border-b hover:text-black hover:bg-gray-100 hover:rounded p-2 ">
                Website 1
              </a>
              <a href="#link1" className="text-gray-500 border-b hover:text-black hover:bg-gray-100 hover:rounded p-2 ">
                Website 2
              </a>
              <a href="#link1" className="text-gray-500 hover:text-black hover:bg-gray-100 hover:rounded p-2 ">
                Website 3
              </a>
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <a
              href="#"
              className="text-gray-600 hover:underline text-sm flex items-center"
            >
              View More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-4 h-4 ml-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </a>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
