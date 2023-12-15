import { NextRequest, NextResponse } from "next/server";
import { MyResponse } from "../route";
import { Project, ProjectModel } from "@/db/models/project";
import { z } from "zod";
import { ObjectId } from "mongodb";

type Props = {
  params: {
    id: ObjectId;
  };
};

export const GET = async (_: NextRequest, { params }: Props) => {
  try {
    const id = params.id;
    const project = await Project.readDetailProject(id);
    return NextResponse.json<MyResponse<ProjectModel>>(
      {
        statusCode: 200,
        message: `Pong, GET api/projects/${id} `,
        data: project,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err);
      const errPath = err.issues[0].path[0];
      const errMessage = err.issues[0].message;

      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 400,
          error: `${errPath} - ${errMessage}`,
        },
        {
          status: 400,
        }
      );
    }
  }
};
