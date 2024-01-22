import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  columns: any;
};

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const columns = await prisma.column.findMany();
  return Response.json({ columns });
}
