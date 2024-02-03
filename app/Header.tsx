import { Satisfy as FontStyle } from "next/font/google";
import { authOptions } from "@/lib/auth";
import { getUserSession } from "@/lib/session";
import LogOut from "./components/common/LogOut";

const font = FontStyle({
  weight: ["400"],
  subsets: ["latin"],
});

export default async function Header() {
  const user = await getUserSession(authOptions);

  return (
    <div className="w-full p-4">
      {user && (
        <div className="flex justify-between  w-full ">
          <p>
            <span className={`${font.className} text-2xl`}>Signed in as</span>
            <span> {user?.email}</span>
          </p>

          <LogOut />
        </div>
      )}
    </div>
  );
}
