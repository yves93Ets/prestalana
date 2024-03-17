"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
