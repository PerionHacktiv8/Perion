import { Users } from "@/db/models/user";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    console.log(data, 14);

    const payment = await Users.invoiceXendit(data);
    console.log(payment, 17);
    return NextResponse.json<MyResponse<unknown>>({
      statusCode: 201,
      data: payment,
    });
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

    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 500,
        message: "Internal Server Error !",
      },
      {
        status: 500,
      }
    );
  }
};
