import { Portfolio } from "@/db/models/portfolio";
import { NextRequest } from "next/server";
import { z } from "zod";

export type MyResponse = {
  statusCode: number;
  message?: string;
  data?: string;
  error?: string;
};

export const POST = async (req: NextRequest) => {
  try {
    const input = await req.formData();
    console.log(input);
  } catch (error) {
    console.log(error);
  }
};
