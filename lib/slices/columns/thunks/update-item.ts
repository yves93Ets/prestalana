import { URI } from "@/utils/columnUtils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DropResult } from "@hello-pangea/dnd";

/**
 * Create a new item the item can have a task and a stateOrder
 * @param {DropResult} result - The drag n drop result which includes id and state order
 */

const thunk = async (body: DropResult) => {
  try {
    if (body.source.droppableId === body.destination?.droppableId) return body;

    const id = body.draggableId;
    const stateOrder = body.destination?.droppableId;
    axios.put(`${URI.items}`, { id, stateOrder });

    return body;
  } catch (error: any) {
    throw Error("Error fetching data", error);
  }
};

export const updateItem = createAsyncThunk("columns/updateItem", thunk);
