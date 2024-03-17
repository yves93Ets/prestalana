"use client";

import { useState, lazy, useEffect } from "react";
import { motion } from "framer-motion";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Row, Col, Dropdown } from "react-bootstrap";
import { CopyPlus, Trash } from "lucide-react";

import { ItemDelete } from "@/interfaces/Items";
import { IconNavButton } from "@/app/components/common";
import useColumns from "@/app/components/hooks/useColumns";
import {
  CreateColumnAction,
  RenameColumnAction,
} from "@/app/components/column";

import { DroppableColumn } from "./DroppableColumn";
import { deleteColumn } from "../column/column-actions";

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
  const {
    getColumns: columns,
    deleteItem,
    updateStateOrder,
    setColumnsInStore,
  } = useColumns();

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

  const handleDeleteColumn = async (id: string) => {
    await deleteColumn(id);
    setColumnsInStore();
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

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
        <Row className="justify-evenly">
          {Object.entries(columns).map(([columnId, column]) => (
            <Col
              key={columnId}
              xs={12}
              md={12}
              lg="auto"
              xl="auto"
              className="md:w-56 w-56 sm:w-full rounded-lg"
            >
              <h3 className="rounded-lg p-2 my-2 flex justify-between ">
                {column.name}
                <span className="cursor-pointer">
                  {selected.columnId === columnId ? (
                    <Trash
                      onClick={handleDelete}
                      size={32}
                      className="btn-rounded onHover !bg-gray-500 "
                    />
                  ) : (
                    <Dropdown>
                      <Dropdown.Toggle className="border-none  onHoverInherit text-black p-0 btn-primary">
                        ...
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => handleDeleteColumn(column.id)}
                        >
                          Delete
                        </Dropdown.Item>
                        <Dropdown.Item as="div">
                          <RenameColumnAction
                            id={column.id}
                            title={column.name}
                          />
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </span>
              </h3>
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
