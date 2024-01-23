import { Board } from "./components/Board";
import Link from "next/link";

import { authOptions } from "@/lib/auth";
import { getUserSession } from "@/lib/session";
import LogOut from "./components/common/LogOut";

export default async function Home() {
  const user = await getUserSession(authOptions);

  return (
    <main className="main">
      <div className="container">
        {user ? (
          <>
            <p>Signed in as {user?.email}</p>
            <LogOut />
            <Board />
          </>
        ) : (
          <div className="center">
            <button className="button w-auto">
              <Link className="text-white no-underline " href="/auth">
                Go to login
              </Link>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
