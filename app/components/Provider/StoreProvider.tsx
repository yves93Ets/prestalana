"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { store, AppStore } from "../../../lib/store";
import { ColumnsActions } from "@/lib/slices/columns/columnsSlice";
import { ProviderProps } from "@/interfaces/interface";

interface StoreProviderProps extends ProviderProps {
  session: any;
}

export default function StoreProvider({
  children,
  session,
}: StoreProviderProps) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = store();
  }
  if (session && storeRef.current)
    storeRef.current.dispatch(ColumnsActions.buildColumns());

  return <Provider store={storeRef.current}>{children}</Provider>;
}
