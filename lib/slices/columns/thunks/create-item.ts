import { ItemForm } from "@/interfaces/Items";
import { URI } from "@/utils/columnUtils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Create a new item the item can have a task and a stateOrder
 * @param {string} task - The task to be performed.
 * @param {string} stateOrder - The order of the state. min to 1 max depends on the number of columns
 */

const thunk = async (body: ItemForm) => {
  try {
    const res = await axios.post(URI.items, body);

    if (res.status === 200) {
      const item = res.data.item;
      return item;
    }
    throw Error("Error adding item");
  } catch (error: any) {
    throw Error("Error fetching data", error);
  }
};

export const createItem = createAsyncThunk("columns/createItem", thunk);
