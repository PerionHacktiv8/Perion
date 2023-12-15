import { Project, ProjectModel } from "@/db/models/project";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

export const POST = async (req: NextRequest) => {
  try {
    const input = await req.formData();

    const created = await Project.createProject(input);

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 200,
        message: "Project Has Created",
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

export const GET = async () => {
  try {
    const projects = await Project.readProjects();
    if (!projects) {
      throw new Error("Cannot find data");
    }

    return NextResponse.json<MyResponse<ProjectModel[]>>(
      {
        statusCode: 200,
        message: "Pong from GET /api/projects !",
        data: projects,
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

export const PUT = async (req: NextRequest) => {
  try {
  } catch (error) {}
};
export const DELETE = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const id = data._id;

    await Project.deleteProject(id);
    return NextResponse.json<MyResponse<ProjectModel>>(
      {
        statusCode: 200,
        message: "Pong from DELETE /api/projects !",
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
