import React from "react";
import { motion } from "framer-motion";

import { ChildrenProps } from "@/interfaces/Common";

interface HoverProps extends ChildrenProps {
  onlyGrow?: boolean;
  className?: string;
}

const WithHover = ({
  children,
  onlyGrow = false,
  className = "",
}: HoverProps) => {
  const props = onlyGrow
    ? { scale: 1.2 }
    : { x: ["-10px", "10px", "-10px", "10px"] };
  return (
    <motion.div
      className={className}
      animate={{ x: 0, scale: 1 }}
      whileHover={{ ...props, transition: { yoyo: Infinity, duration: 0.5 } }}
    >
      {children}
    </motion.div>
  );
};

export default WithHover;
