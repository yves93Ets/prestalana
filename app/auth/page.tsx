import { redirect } from "next/navigation";

import { getUserSession } from "@/lib/session";
import { authOptions } from "@/lib/auth";
import SigninWithGoogle from "../components/common/SigninWithGoogle";
import SignInWithEmail from "../components/common/SignInWithEmail";

export const metadata = {
  title: "Prestalana-Auth",
  description: "Sign in with magic email or google",
};

export default async function SignUp() {
  const user = await getUserSession(authOptions);
  if (user) return redirect("/");

  return (
    <div className="container space-y-6">
      <SignInWithEmail />
      <SigninWithGoogle />
    </div>
  );
}
