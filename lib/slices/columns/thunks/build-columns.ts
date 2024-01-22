import { normalizeColumns } from "@/app/utils/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Get simple columns and items then returns the columns as an object with items at proper position
 *
 */

const thunk = async () => {
  const columnsPromise = axios.get("http://localhost:3000/api/columns");
  const itemsPromise = axios.get("http://localhost:3000/api/items");
  try {
    const [itemsRes, colsRes] = await Promise.all([
      itemsPromise,
      columnsPromise,
    ]);

    if (itemsRes.status === 200 && colsRes.status === 200) {
      const items = itemsRes.data.items;
      const cols = colsRes.data.columns;
      const columns = normalizeColumns(items, cols);

      return columns;
    }

    throw Error("Error building columns");
  } catch (error: any) {
    throw Error("Error fetching data", error);
  }
};

export const buildColumns = createAsyncThunk("columns/buildColumns", thunk);