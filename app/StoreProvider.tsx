"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { store, AppStore } from "../lib/store";
import { ColumnsActions } from "@/lib/slices/columns/columnsSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = store();
  }

  storeRef.current.dispatch(ColumnsActions.buildColumns());

  return <Provider store={storeRef.current}>{children}</Provider>;
}
