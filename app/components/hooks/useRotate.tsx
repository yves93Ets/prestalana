import { useRef } from "react";
import { useAnimationFrame } from "framer-motion";

const useRotate = () => {
  const ref = useRef<HTMLDivElement>(null);
  useAnimationFrame((time, delta) => {
    if (ref.current) {
      ref.current.style.transform = `rotateY(${time}deg)`;
    }
  });

  return {
    ref,
  };
};

export default useRotate;
