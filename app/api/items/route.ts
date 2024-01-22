import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  items: any;
};

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const items = await prisma.item.findMany();
  return Response.json({ items });
}
