import { redirect } from "next/navigation";

import { getUserSession } from "@/lib/session";
import { authOptions } from "@/lib/auth";
import { SigninWithGoogle, SignInWithEmail } from "../components/common/";

export const metadata = {
  title: "Prestalana-Auth",
  description: "Sign in with magic email or google",
};

export default async function SignUp() {
  const user = await getUserSession(authOptions);
  if (user) return redirect("/");

  return (
    <div className="space-y-6 h-[600px] w-[600px]  bg-white-to-gray rounded center self-center">
      <SignInWithEmail />
      <SigninWithGoogle />
    </div>
  );
}
