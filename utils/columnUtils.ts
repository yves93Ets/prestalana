import { Column, Columns } from "@/interfaces/Columns";
import { Item, ItemDelete } from "@/interfaces/Items";
import { DropResult } from "@hello-pangea/dnd";

const url = process.env.NEXT_PUBLIC_URL;

export const URI = {
  items: `${url}/api/items`,
  columns: `${url}/api/columns`,
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

export const onDragItemEnd = (
  { source, destination }: DropResult,
  columns: Columns
) => {
  if (!destination) return columns;

  const sourceColumn = columns[source.droppableId];
  const destColumn = columns[destination.droppableId];
  const sourceItems = [...sourceColumn.items];
  const destItems = [...destColumn.items];
  const [moved] = sourceItems.splice(source.index, 1);
  const destIndex = destination.index;

  if (source.droppableId !== destination.droppableId) {
    return {
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
    };
  } else {
    sourceItems.splice(destination.index, 0, moved);

    return {
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
    };
  }
};

export const onDeleteItem = (selected: ItemDelete, columns: Columns) => {
  const column = columns[selected.columnId];

  return column.items.filter((item) => item.id !== selected.itemId);
};

export const moveColumns = (
  srcIndex: number,
  destIndex: number,
  columns: Columns
) => {
  const arr = slideColumns(srcIndex, destIndex, columns);

  return updateColumnsOrder(arr);
};

export const updateColumnsOrder = (columns: Column[]) =>
  columns.map((col, index) => ({
    ...col,
    order: index + 1,
    items: col.items.map((item) => ({
      ...item,
      stateOrder: (index + 1).toString(),
    })),
  }));

export const convertArrayToObject = (colsWihtNewOrder: Column[]) => {
  return colsWihtNewOrder.reduce((obj: { [key: number]: any }, col, index) => {
    obj[index + 1] = col;
    return obj;
  }, {});
};

export const slideColumns = (
  srcIndex: number,
  destIndex: number,
  columns: Columns
) => {
  const arr = Object.values(columns);

  const col = arr[srcIndex];
  arr.splice(srcIndex, 1);
  arr.splice(destIndex, 0, col);

  return arr;
};
