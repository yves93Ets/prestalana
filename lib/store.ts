import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ColumnsReducer } from "@/lib/slices/columns/columnsSlice";

export const store = () => {
  const reducer = combineReducers({
    columnsState: ColumnsReducer,
  });
  return configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
