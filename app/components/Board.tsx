"use client";
import { useState, useEffect } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { Row, Col } from "react-bootstrap";
import { CopyPlus, Trash } from "lucide-react";
import { Columns } from "@/interfaces/Columns";
import { ItemDelete, ItemUpdate } from "@/interfaces/Items";
import useColumns from "@/hooks/useColumns";

import { onDragEnd } from "@/utils/utils";
import { IconNavButton } from "@/app/components/common/IconNavButton";
import { DroppableColumn } from "./DroppableColumn";

export function Board() {
  const [columns, setColumns] = useState<Columns>({} as Columns);
  const [selected, setSelected] = useState<ItemDelete>({
    columnId: "",
    itemId: "",
  });
  const { getColumns, deleteItem, updateStateOrder } = useColumns();

  useEffect(() => {
    setColumns(getColumns);
  }, [getColumns]);

  const handleSelect = (columnId: string, itemId: string) => {
    if (selected.columnId === columnId && selected.itemId === itemId) {
      setSelected({ columnId: "", itemId: "" });
      return;
    }
    setSelected({ columnId, itemId });
  };

  const handleDelete = () => {
    deleteItem(selected);
    setSelected({ columnId: "", itemId: "" });
  };

  const handleDragEnd = async (result: DropResult) => {
    onDragEnd(result, columns, setColumns);
    const body = {
      id: result.draggableId,
      stateOrder: result.destination?.droppableId,
    } as ItemUpdate;

    await updateStateOrder(body);
  };

  if (Object.keys(columns).length === 0) return null;

  return (
    <div className="w-full bg-gray-100 rounded xl:p-4 p-4">
      <div className="w-content py-2">
        <IconNavButton
          href="/item/create"
          icon={CopyPlus}
          tooltipText="Add an item"
        />
      </div>

      <DragDropContext
        onDragStart={() => setSelected({ columnId: "", itemId: "" })}
        onDragEnd={handleDragEnd}
      >
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
                    className="btn-rounded onHover !bg-gray-500 relative bottom-[60px] left-[180px]"
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
    </div>
  );
}
