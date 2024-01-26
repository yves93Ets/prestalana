"use client";
import { useRouter } from "next/navigation";
import { ArrowLeftCircle } from "lucide-react";

import CreateItemForm from "@/app/components/CreateItemForm";
import { IconNavButton } from "@/app/components/common/IconNavButton";

export default function Item() {
  const router = useRouter();
  return (
    <main className="main">
      <div className="mt-10">
        <IconNavButton
          href="/"
          icon={ArrowLeftCircle}
          tooltipText="Go back to dashboard"
        />
        <CreateItemForm />
      </div>
    </main>
  );
}
