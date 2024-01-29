"use client";

import { ProviderProps } from "@/interfaces/Columns";
import { SessionProvider } from "next-auth/react";

const Provider = ({ children }: ProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
