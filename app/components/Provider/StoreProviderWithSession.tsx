import { authOptions } from "@/lib/auth";
import { getUserSession } from "@/lib/session";
import { StoreProvider } from ".";
import { ChildrenProps } from "@/interfaces/Common";

export default async function StoreProviderWithSession({
  children,
}: ChildrenProps) {
  const user = await getUserSession(authOptions);

  return <StoreProvider session={user}>{children}</StoreProvider>;
}
