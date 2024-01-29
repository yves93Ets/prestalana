import { createSlice } from "@reduxjs/toolkit";

import { Columns } from "@/interfaces/Columns";
/////////////.  responsive  BOARD ******** update on change  
import { buildColumns } from "./thunks/build-columns";
import { createItem } from "./thunks/create-item";
import { deleteItem } from "./thunks/delete-item";

const initialState = {
  columns: {} as Columns,
  error: false,
};

const slice = createSlice({
  name: "columns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(buildColumns.fulfilled, (state, action) => {
        const cols = action.payload;

        state.columns = cols;
      })
      .addCase(buildColumns.rejected, (state, action) => {})

      .addCase(createItem.fulfilled, (state, action) => {
        const item = action.payload;
        const items = state.columns[item.stateOrder].items;

        state.columns[item.stateOrder].items = [...items, item];
      })
      .addCase(createItem.rejected, (state, action) => {})

      .addCase(deleteItem.fulfilled, (state, action) => {
        const { itemId, columnId } = action.payload;
        const items = state.columns[columnId].items;
        const newItems = items.filter((item) => item.id !== itemId);

        state.columns[columnId].items = newItems;
      })
      .addCase(deleteItem.rejected, (state, action) => {});
  },
});

export const ColumnsActions = {
  ...slice.actions,
  buildColumns,
  createItem,
  deleteItem,
};

export const ColumnsReducer = slice.reducer;
