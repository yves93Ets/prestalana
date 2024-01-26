import Link from "next/link";

import { authOptions } from "@/lib/auth";
import { getUserSession } from "@/lib/session";
import LogOut from "./components/common/LogOut";
import { Children } from "react";

export default async function Header() {
  const user = await getUserSession(authOptions);

  return (
    <div className="w-full p-4">
      {user ? (
        <>
          <div className="flex justify-between  w-full ">
            <p>Signed in as {user?.email}</p>
            <LogOut />
          </div>
        </>
      ) : (
        <div className="center">
          <button className="button w-auto">
            <Link className="no-underline text-black" href="/auth">
              Go to login
            </Link>
          </button>
        </div>
      )}
    </div>
  );
}
