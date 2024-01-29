"use client";
import { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Row, Col } from "react-bootstrap";
import { CopyPlus, Trash } from "lucide-react";
import { Columns,  } from "@/interfaces/Columns";
import { ItemDelete } from "@/interfaces/Items";
import useColumns from "@/hooks/useColumns";

import { onDragEnd } from "@/utils/utils";
import { IconNavButton } from "@/app/components/common/IconNavButton";

export function Board() {
  const [columns, setColumns] = useState<Columns>({} as Columns);
  const [selected, setSelected] = useState<ItemDelete>({
    columnId: "",
    itemId: "",
  });
  const { getColumns, deleteItem } = useColumns();

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

  if (Object.keys(columns).length === 0) return null;

  return (
    <div className="w-full">
      <div className="px-16">
        <IconNavButton
          href="/item/create"
          icon={CopyPlus}
          tooltipText="Add an item"
        />
      </div>

      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <Row className="justify-evenly">
          {Object.entries(columns).map(([columnId, column]) => (
            <Col
              key={columnId}
              xs={12}
              md={12}
              lg="auto"
              xl="auto"
              className="w-56 rounded-lg p-3 "
            >
              <h3 className="w-56  rounded-lg p-2 ">{column.name}</h3>
              {selected.columnId === columnId && (
                <div>
                  <Trash
                    onClick={handleDelete}
                    size={40}
                    className="btn-rounded onHover !bg-gray-500 float-right relative bottom-[60px]"
                  />
                </div>
              )}

              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => (
                  <>
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`w-56 min-h-[500px] bg-gray-300 rounded-lg p-2 ${
                        snapshot.isDraggingOver ? "bg-gray-500" : "bg-gray-400"
                      }`}
                    >
                      {column.items.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              onClick={() => handleSelect(columnId, item.id)}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`select-none p-4 mb-2 min-h-[50px] text-center  ${
                                snapshot.isDragging
                                  ? "bg-gray-100"
                                  : "bg-gray-200"
                              } ${provided.draggableProps.style}`}
                            >
                              {item.task}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </>
                )}
              </Droppable>
            </Col>
          ))}
        </Row>
      </DragDropContext>
    </div>
  );
}
