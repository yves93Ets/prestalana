'use client'
import React, { useState, useEffect } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  resetServerContext,
} from 'react-beautiful-dnd'
import { v4 as uuid } from 'uuid'

interface Item {
  id: string
  content: string
}

interface Column {
  name: string
  items: Item[]
}

interface Columns {
  [key: string]: Column
}

const itemsFromBackend: Item[] = [
  { id: uuid(), content: 'First task' },
  { id: uuid(), content: 'Second task' },
  { id: uuid(), content: 'Third task' },
  { id: uuid(), content: 'Fourth task' },
  { id: uuid(), content: 'Fifth task' },
]

const columnsFromBackend: Columns = {
  ['Requested']: {
    name: 'Requested',
    items: itemsFromBackend,
  },
  [uuid()]: {
    name: 'To do',
    items: [],
  },
  [uuid()]: {
    name: 'In Progress',
    items: [],
  },
  [uuid()]: {
    name: 'Done',
    items: [],
  },
}

const onDragEnd = (
  result: DropResult,
  columns: Columns,
  setColumns: React.Dispatch<React.SetStateAction<Columns>>
) => {
  if (!result.destination) return
  const { source, destination } = result

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]
    const sourceItems = [...sourceColumn.items]
    const destItems = [...destColumn.items]
    const [removed] = sourceItems.splice(source.index, 1)
    destItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    })
  } else {
    const column = columns[source.droppableId]
    const copiedItems = [...column.items]
    const [removed] = copiedItems.splice(source.index, 1)
    copiedItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    })
  }
}

export function Board() {
  const [columns, setColumns] = useState<Columns>(columnsFromBackend)

  useEffect(() => {
    setColumns(columnsFromBackend)
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      <button
        onClick={() => {
          setColumns((col) => {
            console.log(`col`, col.Requested)
            col.Requested.items = [
              ...col.Requested?.items,
              { id: uuid(), content: 'new task' },
            ]

            return col
          })
        }}
      >
        add
      </button>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            key={columnId}
          >
            <h2>{column.name}</h2>
            <div style={{ margin: 8 }}>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver
                        ? 'lightblue'
                        : 'lightgrey',
                      padding: 4,
                      width: 250,
                      minHeight: 500,
                    }}
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
                            style={{
                              userSelect: 'none',
                              padding: 16,
                              margin: '0 0 8px 0',
                              minHeight: '50px',
                              backgroundColor: snapshot.isDragging
                                ? '#263B4A'
                                : '#456C86',
                              color: 'white',
                              ...provided.draggableProps.style,
                            }}
                          >
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        ))}
      </DragDropContext>
    </div>
  )
}
