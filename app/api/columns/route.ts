import { prisma } from "@/lib/prisma";

export async function GET() {
  const columns = await prisma.column.findMany();

  return Response.json({ columns });
}
