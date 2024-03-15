"use client";
import { useRef } from "react";
import { Provider } from "react-redux";

import { store, AppStore } from "@/lib/store";
import { ChildrenProps } from "@/interfaces/Common";

interface StoreProviderProps extends ChildrenProps {
  session: any;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) storeRef.current = store();

  return <Provider store={storeRef.current}>{children}</Provider>;
}
