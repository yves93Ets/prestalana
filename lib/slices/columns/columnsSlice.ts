import { createSlice } from "@reduxjs/toolkit";

import { Columns } from "@/interfaces/interface";

import { buildColumns } from "./thunks/build-columns";

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

      .addCase(buildColumns.rejected, (state, action) => {
        console.log(1111, "action", action);
      });
  },
});

export const ColumnsActions = {
  ...slice.actions,
  buildColumns,
};

export const ColumnsReducer = slice.reducer;
