import Link from "next/link";
import dynamic from "next/dynamic";

import { authOptions } from "@/lib/auth";
import { getUserSession } from "@/lib/session";
import Loading from "./loading";

const DynamicBoard = dynamic(() => import("./components/Board"), {
  loading: () => <Loading />,
});

export const metadata = {
  title: "Prestalana-Board",
  description: "Trello like board with dnd",
};

export default async function Home() {
  const user = await getUserSession(authOptions);

  return (
    <main className="main bg-grey-300">
      <div className="bg-grey-200 w-full p-4">
        {user ? (
          <DynamicBoard />
        ) : (
          <button className="button w-auto bg-white-to-gray p-4">
            <Link className="no-underline text-black" href="/auth">
              Go to login
            </Link>
          </button>
        )}
      </div>
    </main>
  );
}
