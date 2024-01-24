"use client";

import { signOut } from "next-auth/react";

export default function LogOut() {
  return (
    <div className="loginBtn">
      <button
        onClick={() =>
          signOut({
            callbackUrl: `${window.location.origin}/auth`,
          })
        }
        className={`button text-center `}
      >
        Log out
      </button>
    </div>
  );
}
