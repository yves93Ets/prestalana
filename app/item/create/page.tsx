"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import CreateItemForm from "@/app/components/CreateItemForm";

export default function Item() {
  const router = useRouter();
  return (
    <main className="main">
      <motion.div
        className="mt-10 lg:min-w-[650px]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CreateItemForm />
      </motion.div>
    </main>
  );
}
