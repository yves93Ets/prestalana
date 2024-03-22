"use server";

import { SwapColumns } from "@/interfaces/Columns";
import { prisma } from "@/lib/prisma";

export const getColumns = async () => {
  try {
    return await prisma.column.findMany({
      select: {
        id: true,
        name: true,
        order: true,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const addColumn = async (order: number, form: FormData) => {
  const data = {
    name: form.get("name") as string,
    order,
  };

  try {
    await prisma.column.create({ data });
  } catch (error) {
    console.error(error);
  }
};

export const deleteColumn = async (id: string) => {
  try {
    await prisma.column.delete({ where: { id } });
  } catch (error) {
    console.error(error);
  }
};

export const renameColumn = async (id: string, form: FormData) => {
  try {
    const name = form.get("name") as string;

    await prisma.column.update({
      where: { id },
      data: { name },
    });
  } catch (error) {
    console.error(error);
  }
};

export const swapColumns = async ({
  id,
  order,
  itemIds,
  srcId,
  srcOrder,
  srcItemIds,
}: SwapColumns) => {
  try {
    const dest = prisma.column.update({
      where: { id },
      data: { order: order },
    });

    const src = prisma.column.update({
      where: { id: srcId },
      data: { order: srcOrder },
    });

    const srcItems = prisma.item.updateMany({
      where: { id: { in: srcItemIds } },
      data: { stateOrder: order.toString() },
    });

    const items = prisma.item.updateMany({
      where: { id: { in: itemIds } },
      data: { stateOrder: srcOrder.toString() },
    });

    await Promise.all([dest, src, srcItems, items]);
  } catch (error) {
    console.error(error);
  }
};
