import {
  Card,
  CardHeader,
  CardBody,
  Typography,
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

export function RequirementCard() {
  return (
    <Card placeholder={''} color="white" className="w-full max-w-[23rem] p-8">
      <CardHeader
        placeholder={''}
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-black/20 pb-5 text-center"
      >
        <h2 className="text-2xl font-bold text-black">Project Descriptions</h2>
      </CardHeader>
      <CardBody placeholder={''} className="p-0">
        <ul className="flex flex-col gap-4">
          <li className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-medium">Project Type</p>
              <p className="font-bold text-xl text-black">Freelance</p>
            </div>
          </li>
          <li className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-medium">Project Location</p>
              <p className="font-bold text-xl text-black">
                Tangerang, Indonesia
              </p>
            </div>
          </li>
          <li className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-medium">On Site Required</p>
              <p className="font-bold text-xl text-black">
                Not Required - Remote
              </p>
            </div>
          </li>
        </ul>
      </CardBody>
      <CardHeader
        placeholder={''}
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mt-8 mb-8 rounded-none border-b border-black/20 pb-5 text-center"
      >
        <h2 className="text-2xl font-bold text-black">Project Requirements</h2>
      </CardHeader>
      <CardBody placeholder={''} className="p-0">
        <ul className="flex flex-col gap-4">
          <li className="flex flex-col sm:flex-row items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon />
            </span>
            <Typography placeholder={''} className="font-normal">
              0 - 1 Experience Years
            </Typography>
          </li>
          <li className="flex flex-col sm:flex-row items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon />
            </span>
            <Typography placeholder={''} className="font-normal">
              1 Project Created
            </Typography>
          </li>
        </ul>
      </CardBody>
      <CardHeader
        placeholder={''}
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mt-8 mb-8 rounded-none border-b border-black/20 pb-5 text-center"
      >
        <h2 className="text-2xl font-bold text-black">Partner Needed</h2>
      </CardHeader>
      <CardBody placeholder={''} className="p-0">
        <ul className="flex flex-col gap-4">
          <li className="flex flex-col sm:flex-row items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon />
            </span>
            <Typography placeholder={''} className="font-normal">
              HTML/CSS Developers
            </Typography>
          </li>
          <li className="flex flex-col sm:flex-row items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon />
            </span>
            <Typography placeholder={''} className="font-normal">
              JavaScript/React Developers
            </Typography>
          </li>
          <li className="flex flex-col sm:flex-row items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon />
            </span>
            <Typography placeholder={''} className="font-normal">
              SQL Developers
            </Typography>
          </li>
          <li className="flex flex-col sm:flex-row items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon />
            </span>
            <Typography placeholder={''} className="font-normal">
              UI/UX Designer
            </Typography>
          </li>
          <li className="flex flex-col sm:flex-row items-center gap-4">
            <span className="rounded-full border border-white/20 bg-white/20 p-1">
              <CheckIcon />
            </span>
            <Typography placeholder={''} className="font-normal">
              REST API Developers
            </Typography>
          </li>
        </ul>
      </CardBody>
    </Card>
  )
}
