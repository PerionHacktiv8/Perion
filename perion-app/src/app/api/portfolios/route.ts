import { Portfolio } from "@/db/models/portfolio";
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

    await Portfolio.createPortfolio(input);
    return NextResponse.json<MyResponse<string>>(
      {
        statusCode: 201,
        message: "A Portfolio Has Created",
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    let errCode = 500;
    let errMsg = "INTERNAL SERVER ERROR";

    if (err instanceof z.ZodError) {
      errCode = 400;
      errMsg = err.issues[0].message;
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
