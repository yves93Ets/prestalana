import { prisma } from "@/lib/prisma";
import { cache } from "react";

export async function GET() {
  const items = await getItems();

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
 * @param {string} id - Id of task to update
 * @param {string} stateOrder - The order of the state. min to 1 max depends on the number of columns
 */

export async function PUT(req: Request) {
  const data = await req.json();
  await prisma.item.update({
    where: { id: data.id },
    data: {
      stateOrder: data.stateOrder,
    },
  });

  return Response.json(true);
}

export async function DELETE(req: Request) {
  const data = await req.json();
  try {
    await prisma.item.delete({ where: { id: data.itemId } });

    return Response.json({ status: 200 });
  } catch (error) {
    console.error("error", error);

    return Response.json({ error, status: 500 });
  }
}

const getItems = cache(() =>
  prisma.item.findMany({
    select: {
      id: true,
      task: true,
      stateOrder: true,
    },
  })
);
