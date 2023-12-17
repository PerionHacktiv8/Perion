import { Button } from "@material-tailwind/react";

export function ProfileNav() {
    return (
      <div className="flex items-center gap-4 mt-0">
      <Button placeholder={""} variant="gradient" className="rounded-full">
        Project
      </Button>
      <Button placeholder={""} variant="outlined" className="rounded-full">
        Portfolio
      </Button>
    </div>
    )
}    