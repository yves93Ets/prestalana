"use client";

import Lottie from "react-lottie-player";
import animation from "@/app/animation/searching.json";

export function SearchingAnimated(props: any) {
  return (
    <Lottie animationData={animation as unknown as Animation} {...props} />
  );
}
