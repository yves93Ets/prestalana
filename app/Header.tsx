import { authOptions } from "@/lib/auth";
import { getUserSession } from "@/lib/session";
import LogOut from "./components/common/LogOut";

export default async function Header() {
  const user = await getUserSession(authOptions);

  return (
    <div className="w-full p-4 header">
      {user && (
        <div className="flex justify-between  w-full ">
          <p>Signed in as {user?.email}</p>
          <LogOut />
        </div>
      )}
    </div>
  );
}
