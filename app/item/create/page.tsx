"use client";
import { useRouter } from "next/navigation";
import { ArrowLeftCircle } from "lucide-react";
import CreateItemForm from "@/app/components/CreateItemForm";
import { Button } from "react-bootstrap";

export default function Item() {
  const router = useRouter();
  return (
    <main className="main">
      <div className="center mt-10">
        <Button className="button" onClick={() => router.push("/")}>
          <div className="button gap-2">
            <ArrowLeftCircle />
            dashboard
          </div>
        </Button>
        <CreateItemForm />
      </div>
    </main>
  );
}
