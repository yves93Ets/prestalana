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
    return error;
  }
};

export const handleDeleteColumn = async (id: string) => {
  console.log(1111, id);
  try {
    await prisma.column.delete({ where: { id } });

    revalidatePath("/");
  } catch (error) {
    return error;
  }
};
