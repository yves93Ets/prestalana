import { createSlice } from "@reduxjs/toolkit";

import { Columns } from "@/interfaces/interface";

import { buildColumns } from "./thunks/build-columns";
import { createItem } from "./thunks/create-item";

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

      .addCase(createItem.rejected, (state, action) => {});
  },
});

export const ColumnsActions = {
  ...slice.actions,
  buildColumns,
  createItem,
};

export const ColumnsReducer = slice.reducer;
