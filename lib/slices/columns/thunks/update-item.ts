import { ItemUpdate } from "@/interfaces/Items";
import { URI } from "@/utils/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Create a new item the item can have a task and a stateOrder
 * @param {string} id - The id of the task to update
 * @param {string} stateOrder - The order of the state. min to 1 max depends on the number of columns
 */

const thunk = async (body: ItemUpdate) => {
  try {
    const res = await axios.put(`${URI.items}`, body );
    if (res.status === 200) return { ...body };

    throw Error("Error adding item");
  } catch (error: any) {
    throw Error("Error fetching data", error);
  }
};

export const updateItem = createAsyncThunk("columns/updateItem", thunk);
