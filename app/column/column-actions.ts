"use server";

import { Column, Columns } from "@/interfaces/Columns";
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

export const updateColumnsOrderAction = (
  arrColumns: Column[],
  columns: Columns
) => {
  try {
    arrColumns.forEach(async (col, index) => {
      const order = index + 1;

      if (col.id === columns[order].id) return;
      const ids = col.items.map((item) => item.id);

      const updateCols = prisma.column.update({
        where: { id: col.id },
        data: { order },
      });

      const updateItems =
        ids.length === 0
          ? null
          : prisma.item.updateMany({
              where: {
                id: { in: ids },
              },
              data: {
                stateOrder: order.toString(),
              },
            });

      await Promise.all([updateCols, updateItems]);
    });
  } catch (error) {
    console.error(error);
  }
};
