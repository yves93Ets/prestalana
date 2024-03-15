"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const addColumn = async (form: FormData) => {
  const data = {
    name: form.get("name") as string,
    order: Number(form.get("order")),
  };

  try {
    await prisma.column.create({ data });

    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
};

export const deleteColumn = async (id: string) => {
  try {
    await prisma.column.delete({ where: { id } });

    revalidatePath("/", "layout");
  } catch (error) {
    console.error(error);
  }
};

export const renameColumn = async (form: FormData) => {
  try {
    const name = form.get("name") as string;
    const id = form.get("id") as string;
    await prisma.column.update({
      where: { id },
      data: { name },
    });
    revalidatePath("/", "layout");
  } catch (error) {
    console.error(error);
  }
};
