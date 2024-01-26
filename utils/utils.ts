import { Column, Item, Columns } from "@/interfaces/interface";
import { DropResult } from "@hello-pangea/dnd";
import { SetStateAction, Dispatch } from "react";

export const URI = {
  items: `api/items`,
  columns: `api/columns`,
};

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

  const sourceColumn = columns[source.droppableId];
  const destColumn = columns[destination.droppableId];
  const sourceItems = [...sourceColumn.items];
  const destItems = [...destColumn.items];
  const [moved] = sourceItems.splice(source.index, 1);
  const destIndex = destination.index;

  if (source.droppableId !== destination.droppableId) {
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: [
          ...destItems.slice(0, destIndex),
          moved,
          ...destItems.slice(destIndex),
        ],
      },
    });
  } else {
    sourceItems.splice(destination.index, 0, moved);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: [
          ...sourceItems.slice(0, destIndex),
          ...sourceItems.slice(destIndex),
        ],
      },
    });
  }
};
