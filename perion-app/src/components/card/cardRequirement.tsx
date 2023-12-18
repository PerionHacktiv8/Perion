import { ProjectModel } from '@/db/models/project'
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

export function RequirementCard({ datum }: { datum: ProjectModel }) {
  return (
    <Card placeholder={''} color="white" className="w-full border p-5">
      <h2 className="mb-3 rounded-none border-b border-black/20 pb-3 text-center">
        <h2 className="text-xl font-bold text-black">Project Descriptions</h2>
      </h2>
      <CardBody placeholder={''} className="p-0">
        <ul className="flex flex-col gap-3">
          <li className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-medium">Project Type</p>
              <p className="font-bold text-black">{datum.jobType}</p>
            </div>
          </li>
          <li className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-medium">Project Location</p>
              <p className="font-bold text-black">{datum.jobLocation}</p>
            </div>
          </li>
          <li className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-medium">On Site Required</p>
              <p className="font-bold text-black">{datum.onSiteRequired}</p>
            </div>
          </li>
        </ul>
      </CardBody>
    </Card>
  )
}
