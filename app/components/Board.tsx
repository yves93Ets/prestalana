"use client";
import { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Row, Col, Button } from "react-bootstrap";
import { CopyPlus } from "lucide-react";
import Link from "next/link";
import { Columns } from "@/interfaces/interface";
import useColumns from "@/hooks/useColumns";

import { onDragEnd } from "@/utils/utils";
import { IconNavButton } from "@/app/components/common/IconNavButton";

export function Board() {
  const [columns, setColumns] = useState<Columns>({} as Columns);
  const { getColumns } = useColumns();

  useEffect(() => {
    setColumns(getColumns);
  }, [getColumns]);

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
              className="w-56 rounded p-3 "
            >
              <h3 className="w-56  rounded p-2 ">{column.name}</h3>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`w-56 min-h-[500px] bg-gray-300 rounded p-2 ${
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
                )}
              </Droppable>
            </Col>
          ))}
        </Row>
      </DragDropContext>
    </div>
  );
}
