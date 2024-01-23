"use client";
import { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Container, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";

import { Columns } from "@/interfaces/interface";
import useColumns from "@/hooks/useColumns";

import { onDragEnd } from "../../utils/utils";

export function Board() {
  const [columns, setColumns] = useState<Columns>({} as Columns);
  const { getColumns } = useColumns();

  useEffect(() => {
    setColumns(getColumns);
  }, [getColumns]);

  if (Object.keys(columns).length === 0) return null;
  return (
    <Container className="!max-w-[1200px]">
      <div className="d-grid m-4 p-12">
        <Button size="lg" className="!bg-blue-700 !border-blue-700">
          <Link className="no-underline text-white" href="/item/create">
            Add Item
          </Link>
        </Button>
      </div>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <Row className="items-center m-2 justify-center">
          {Object.entries(columns).map(([columnId, column]) => (
            <Col
              key={columnId}
              xs={12}
              md={12}
              lg="auto"
              xl="auto"
              className="w-56 text-center rounded p-3 text-white"
            >
              <h3 className="w-56 bg-blue-700 text-center rounded p-2 text-white">
                {column.name}
              </h3>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`w-56 min-h-[500px] bg-blue-300 rounded p-2 ${
                      snapshot.isDraggingOver ? "bg-blue-200" : "bg-gray-300"
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
                            className={`select-none p-4 mb-2 min-h-[50px] text-white ${
                              snapshot.isDragging
                                ? "bg-blue-800"
                                : "bg-blue-700"
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
    </Container>
  );
}
