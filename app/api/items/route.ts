import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.item.findMany();
  return Response.json({ items });
}

/**
 * @param {string} task - The task to be performed.
 * @param {string} stateOrder - The order of the state. min to 1 max depends on the number of columns
 */

export async function POST(req: Request) {
  const data = await req.json();
  const item = await prisma.item.create({ data });
  return Response.json({ item });
}

export async function DELETE(req: Request) {
  const data = await req.json();
  try {
    await prisma.item.delete({ where: { id: data.itemId } });
    return Response.json({ status: 200 });
  } catch (error) {
    console.error(1111, "error", error);
    return Response.json({ error, status: 500 });
  }
}
