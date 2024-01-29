"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { useRouter } from "next/navigation";

import { store, AppStore } from "@/lib/store";
import { ColumnsActions } from "@/lib/slices/columns/columnsSlice";
import { ProviderProps } from "@/interfaces/Columns";

interface StoreProviderProps extends ProviderProps {
  session: any;
}

export default function StoreProvider({
  children,
  session,
}: StoreProviderProps) {
  const storeRef = useRef<AppStore | null>(null);

  // const router = useRouter();
  // const url = window?.location?.pathname;
  // const isAuth = url.includes("/auth");

  // if (!session && !isAuth) return router.push("/auth");

  if (!storeRef.current) {
    storeRef.current = store();
  }
  if (session && storeRef.current) {
    storeRef.current.dispatch(ColumnsActions.buildColumns());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
