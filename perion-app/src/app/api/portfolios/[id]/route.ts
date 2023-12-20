import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { MyResponse } from "../route";
import { Portfolio, PortfolioModel } from "@/db/models/portfolio";
import { ObjectId } from "mongodb";

type Props = {
  params: {
    id: ObjectId;
  };
};

export const GET = async (_req: NextRequest, { params }: Props) => {
  try {
    const id = params.id;

    const portfolio = await Portfolio.detailPortfolio(id);

    return NextResponse.json<MyResponse<PortfolioModel>>(
      {
        statusCode: 200,
        message: `Pong from GET /api/portfolios${id} !`,
        data: portfolio,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    let errCode = 500;
    let errMsg = "INTERNAL SERVER ERROR";

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
    const input = await req.formData();

    await Portfolio.editPortfolio(id, input);
    return NextResponse.json<MyResponse<PortfolioModel>>(
      {
        statusCode: 200,
        message: `Pong from PUT /api/portfolios/${id} !`,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    let errCode = 500;
    let errMsg = "INTERNAL SERVER ERROR";

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
