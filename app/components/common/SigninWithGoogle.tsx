"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

import WithHover from "@/app/components/hoc/WithHover";

export default function SigninWithGoogle() {
  return (
    <WithHover className="loginBtn">
      <button
        onClick={() =>
          signIn("google", {
            callbackUrl: `${window.location.origin}`,
          })
        }
        className={`button !bg-red-600 text-center`}
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
    </WithHover>
  );
}
//11111111111  add an animation on load and on empty columns ,animation on delete
//....11111 add actions for columns handle errors
