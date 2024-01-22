import { Column, Item, Columns } from "@/interfaces/interface";
import { DropResult } from "@hello-pangea/dnd";
import { SetStateAction, Dispatch } from "react";

export const normalizeColumns = (items: Item[], columns: Column[]): Columns => {
  const sortedArray = columns.sort((a, b) => a.order - b.order);

  const groupedByState = items.reduce((acc: { [key: string]: any[] }, obj) => {
    const { stateOrder, ...rest } = obj;

    if (!acc[stateOrder]) {
      acc[stateOrder] = [];
    }
    acc[stateOrder].push(rest);
    return acc;
  }, {});

  const normalized: { [key: string]: Column } = sortedArray.reduce(
    (acc: { [key: string]: Column }, obj) => {
      obj.items = groupedByState[obj.order] || [];
      const order = obj.order.toString();
      acc[order] = obj;
      return acc;
    },
    {}
  );
  return normalized;
};

export const onDragEnd = (
  result: DropResult,
  columns: Columns,
  setColumns: Dispatch<SetStateAction<Columns>>
) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
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
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};
