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

/**
 * @param {string} id - The id of the item to delete.
 */

export async function DELETE(req: Request) {
  const data = await req.json();
  console.log(1111, "22222", 22222);
  try {
    const item = await prisma.item.delete({ where: { id: data.id } });

    console.log(1111, "item", item);
    return Response.json(true);
  } catch (error) {
    return Response.json({ error, status: 500 });
  }
}
