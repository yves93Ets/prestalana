"use client";

import { signOut } from "next-auth/react";
import { LogOut as LogOutBtn } from "lucide-react";

export default function LogOut() {
  return (
    <LogOutBtn
      size={40}
      className="onHover btn-rounded bg-white-to-gray"
      onClick={() =>
        signOut({
          callbackUrl: `${window.location.origin}/auth`,
        })
      }
    />
  );
}
