import { createAsyncThunk } from "@reduxjs/toolkit";
import { DropResult } from "@hello-pangea/dnd";
import { SwapColumns } from "@/interfaces/Columns";
import { swapColumns } from "@/app/column/column-actions";
import { Item } from "@/interfaces/Items";

/**
 * Create a new item the item can have a task and a stateOrder
 * @param {DropResult} result - The drag n drop result which includes id and state order
 */

const thunk = async (
  { source, destination }: DropResult,
  { getState }: { getState: any }
) => {
  try {
    if (!destination?.droppableId) return;
    const srcIndex = source.index + 1;
    const index = destination?.index + 1;
    const columns = getState().columnsState.columns;

    if (srcIndex === index) return;

    const swap: SwapColumns = {
      order: index,
      id: columns[srcIndex].id,
      itemIds: columns[index].items.map((item: Item) => item.id),
      srcOrder: srcIndex,
      srcId: columns[index].id,
      srcItemIds: columns[srcIndex].items.map((item: Item) => item.id),
    };

    swapColumns(swap);
  } catch (error: any) {
    console.log(1111, "error", error);
    throw Error("Error fetching data", error);
  }
};

export const updateColumn = createAsyncThunk("columns/updateColumn", thunk);
