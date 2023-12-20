import { NextRequest, NextResponse } from "next/server";
import { MyResponse } from "../route";
import { Project, ProjectModel } from "@/db/models/project";
import { ZodError, z } from "zod";
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
    let errCode = 500;
    let errMsg = "Internal Server Error";

    if (err instanceof z.ZodError) {
      errCode = 400;
      errMsg = err.issues[0].message;
    }

    if (err instanceof Error) {
      errCode = 404;
      errMsg = err.message;
    }

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: errCode,
        error: errMsg,
      },
      {
        status: errCode,
      }
    );
  }
};

export const PUT = async (req: NextRequest, { params }: Props) => {
  try {
    const id = params.id;

    const data = await req.formData();
    await Project.editProject(id, data);
    return NextResponse.json<MyResponse<string>>(
      {
        statusCode: 200,
        message: "Project Has Updated",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    let errCode = 500;
    let errMsg = "Internal Server Error";

    if (err instanceof z.ZodError) {
      errCode = 400;
      errMsg = err.issues[0].message;
    }

    if (err instanceof Error) {
      errCode = 404;
      errMsg = err.message;
    }

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: errCode,
        error: errMsg,
      },
      {
        status: errCode,
      }
    );
  }
};
