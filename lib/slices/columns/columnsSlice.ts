import { createSlice } from "@reduxjs/toolkit";

import { Columns } from "@/interfaces/Columns";
import { buildColumns } from "./thunks/build-columns";

import { createItem } from "./thunks/create-item";
import { deleteItem } from "./thunks/delete-item";
import { updateItem } from "./thunks/update-item";
import { updateColumn } from "./thunks/update-column";
import { onDeleteItem, onDragItemEnd } from "@/utils/columnUtils";

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
        const selected = action.payload;
        const items = onDeleteItem(selected, state.columns);

        state.columns[selected.columnId].items = items;
      })
      .addCase(deleteItem.rejected, (state, action) => {})

      .addCase(updateItem.fulfilled, (state, action) => {
        const columns = onDragItemEnd(action.payload, state.columns);

        state.columns = columns;
      })
      .addCase(updateItem.rejected, (state, action) => {})

      .addCase(updateColumn.fulfilled, (state, action) => {});
  },
});

export const ColumnsActions = {
  ...slice.actions,
  buildColumns,
  createItem,
  deleteItem,
  updateItem,
  updateColumn,
};

export const ColumnsReducer = slice.reducer;
