"use client";

import { useState, lazy, useEffect } from "react";
import { motion } from "framer-motion";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { CopyPlus } from "lucide-react";

import { ItemDelete } from "@/interfaces/Items";
import { IconNavButton } from "@/app/components/common";
import useColumns from "@/app/components/hooks/useColumns";
import { CreateColumnAction } from "@/app/components/column";

import { DroppableColumn } from "./dnd";
import { moveColumns } from "@/utils/columnUtils";

const Animated = lazy(() =>
  import("@/app/components/common/animations/SearchingAnimated").then(
    (module) => ({ default: module.SearchingAnimated })
  )
);

function Board() {
  const [selected, setSelected] = useState<ItemDelete>({
    columnId: "",
    itemId: "",
  });

  const { columns, updateStateOrder, setColumnsInStore, updateColumnOrder } =
    useColumns();

  const handleDragStart = () => {
    const hasSelection = selected.columnId !== "" && selected.itemId !== "";
    if (hasSelection) setSelected({ columnId: "", itemId: "" });
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    if (result.type === "COLUMN") return await updateColumnOrder(result);

    updateStateOrder(result);
  };

  useEffect(() => {
    setColumnsInStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isVisible = Object.keys(columns).length > 0;

  return (
    <motion.div
      className="w-full bg-white-to-gray rounded xl:p-4 p-4"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: Number(isVisible), scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="py-2 flex justify-between">
        <IconNavButton
          href="/item/create"
          icon={CopyPlus}
          tooltipText="Add an item"
        />
        <CreateColumnAction />
      </div>
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <DroppableColumn selected={selected} setSelected={setSelected} />
      </DragDropContext>
    </motion.div>
  );
}

export default Board;
