import { prisma } from "@/lib/prisma";

type ResponseData = {
  columns: any;
};

export async function GET() {
  const columns = await prisma.column.findMany();
  return Response.json({ columns });
}
