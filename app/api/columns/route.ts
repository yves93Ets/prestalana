import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type ResponseData = {
  columns: any;
};

export async function GET(req: NextRequest, res: NextResponse<ResponseData>) {
  const columns = await prisma.column.findMany();
  return Response.json({ columns });
}
