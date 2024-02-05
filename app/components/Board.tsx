"use client";
import { useState, lazy } from "react";
import { motion } from "framer-motion";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Row, Col } from "react-bootstrap";
import { CopyPlus, Trash } from "lucide-react";
import { ItemDelete } from "@/interfaces/Items";
import useColumns from "@/app/components/hooks/useColumns";

import { IconNavButton } from "@/app/components/common/IconNavButton";
import { DroppableColumn } from "./DroppableColumn";

const Animated = lazy(
  () => import("@/app/components/common/animations/SearchingAnimated")
);

function Board() {
  const [selected, setSelected] = useState<ItemDelete>({
    columnId: "",
    itemId: "",
  });
  const { getColumns: columns, deleteItem, updateStateOrder } = useColumns();

  const handleSelect = (columnId: string, itemId: string) => {
    const self = selected.columnId === columnId && selected.itemId === itemId;
    if (self) return setSelected({ columnId: "", itemId: "" });

    setSelected({ columnId, itemId });
  };

  const handleDragStart = () => {
    const hasSelection = selected.columnId !== "" && selected.itemId !== "";
    if (hasSelection) setSelected({ columnId: "", itemId: "" });
  };

  const handleDelete = () => {
    deleteItem(selected);
    setSelected({ columnId: "", itemId: "" });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    updateStateOrder(result);
  };

  const isVisible = Object.keys(columns).length > 0;

  return (
    <motion.div
      className="w-full bg-white-to-gray rounded xl:p-4 p-4"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: Number(isVisible), scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-max py-2">
        <IconNavButton
          href="/item/create"
          icon={CopyPlus}
          tooltipText="Add an item"
        />
      </div>

      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Row className="justify-evenly">
          {Object.entries(columns).map(([columnId, column]) => (
            <Col
              key={columnId}
              xs={12}
              md={12}
              lg="auto"
              xl="auto"
              className="w-56 sm:w-full  md:w-full rounded-lg"
            >
              <h3 className="rounded-lg p-2 my-2">{column.name}</h3>
              {selected.columnId === columnId && (
                <span className="absolute">
                  <Trash
                    onClick={handleDelete}
                    size={40}
                    className="btn-rounded onHover !bg-gray-500 relative bottom-[50px] left-[180px]"
                  />
                </span>
              )}
              <DroppableColumn
                columnId={columnId}
                column={column}
                itemId={selected.itemId}
                handleSelect={handleSelect}
              />
            </Col>
          ))}
        </Row>
      </DragDropContext>
    </motion.div>
  );
}

export default Board;
