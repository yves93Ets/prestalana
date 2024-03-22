import { ItemDelete } from "@/interfaces/Items";
import { URI } from "@/utils/columnUtils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Create a new item the item can have a task and a stateOrder
 * @param {string} task - The task to be performed.
 * @param {string} stateOrder - The order of the state. min to 1 max depends on the number of columns
 */

const thunk = async (body: ItemDelete) => {
  try {
    const res = await axios.delete(`${URI.items}`, { data: body });
    if (res.status === 200) return body;

    throw Error("Error adding item");
  } catch (error: any) {
    throw Error("Error fetching data", error);
  }
};

export const deleteItem = createAsyncThunk("columns/deleteItem", thunk);
