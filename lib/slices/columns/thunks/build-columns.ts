import { getColumns } from "@/app/column/column-actions";
import { Column } from "@/interfaces/Columns";
import { URI, normalizeColumns } from "@/utils/columnUtils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Get simple columns and items then returns the columns as an object with items at proper position
 *
 */

const thunk = async () => {
  const itemsPromise = axios.get(URI.items);

  try {
    const [itemsRes, cols] = await Promise.all([itemsPromise, getColumns()]);

    if (itemsRes.status === 200) {
      const items = itemsRes.data.items;

      const columns = normalizeColumns(items, cols as Column[]);

      return columns;
    }
    throw Error("Error building columns");
  } catch (error: any) {
    throw Error("Error fetching data", error);
  }
};

export const buildColumns = createAsyncThunk("columns/buildColumns", thunk);
