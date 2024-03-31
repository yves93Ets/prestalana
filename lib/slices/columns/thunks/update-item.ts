import { URI } from "@/utils/columnUtils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DropResult } from "@hello-pangea/dnd";
import { onDragItemEnd } from "@/utils/columnUtils";

/**
 * Create a new item the item can have a task and a stateOrder
 * @param {DropResult} result - The drag n drop result which includes id and state order
 */

const thunk = async (body: DropResult, { getState }: { getState: any }) => {
  try {
    if (body.source.droppableId === body.destination?.droppableId) return body;

    const columns = getState().columnsState.columns;

    const id = body.draggableId;
    const stateOrder = body.destination?.droppableId;
    axios.put(`${URI.items}`, { id, stateOrder });

    return onDragItemEnd(body, columns);
  } catch (error: any) {
    throw Error("Error fetching data", error);
  }
};

export const updateItem = createAsyncThunk("columns/updateItem", thunk);
