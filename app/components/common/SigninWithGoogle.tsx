"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export default function SigninWithGoogle() {
  return (
    <div className="loginBtn">
      <button
        onClick={() =>
          signIn("google", {
            callbackUrl: `${window.location.origin}`,
          })
        }
        className={`button !bg-red-600 text-center `}
      >
        Sign in with Google{" "}
        <Image
          width={20}
          height={20}
          className="mx-2 mt-0.5"
          src="/chrome.png"
          alt="google"
        />
      </button>
    </div>
  );
}
