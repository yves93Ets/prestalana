import Link from "next/link";

import { Board } from "./components/Board";
import { authOptions } from "@/lib/auth";
import { getUserSession } from "@/lib/session";

export const metadata = {
  title: "Prestalana-Board",
  description: "Trello like board with dnd",
};

export default async function Home() {
  const user = await getUserSession(authOptions);

  return (
    <main className="main bg-grey-300">
      <div className=" bg-grey-200 w-full p-4">
        {user ? (
          <Board />
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
    </main>
  );
}
