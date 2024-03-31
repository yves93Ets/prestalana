import { createAsyncThunk } from "@reduxjs/toolkit";
import { DropResult } from "@hello-pangea/dnd";
import { updateColumnsOrderAction } from "@/app/column/column-actions";
import { convertArrayToObject, moveColumns } from "@/utils/columnUtils";

/**
 * Update the column order and the item state order
 * @param {DropResult} result - The drag n drop result which includes id and state order
 */

const thunk = async (
  { source, destination }: DropResult,
  { getState }: { getState: any }
) => {
  try {
    if (!destination?.droppableId) throw Error("No destination");

    const columns = getState().columnsState.columns;
    const colsWihtNewOrder = moveColumns(
      source.index,
      destination.index,
      columns
    );

    // not awaiting as we don't need to wait for the response
    updateColumnsOrderAction(colsWihtNewOrder, columns);

    return convertArrayToObject(colsWihtNewOrder);
  } catch (error: any) {
    console.log("error", error);
    throw Error("Error fetching data", error);
  }
};

export const updateColumn = createAsyncThunk("columns/updateColumn", thunk);
