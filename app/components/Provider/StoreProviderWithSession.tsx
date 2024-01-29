import { authOptions } from "@/lib/auth";
import { getUserSession } from "@/lib/session";
import { StoreProvider } from ".";
import { ProviderProps } from "@/interfaces/Columns";

export default async function StoreProviderWithSession({
  children,
}: ProviderProps) {
  const user = await getUserSession(authOptions);

  return <StoreProvider session={user}>{children}</StoreProvider>;
}
