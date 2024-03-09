"use client";

import Lottie from "react-lottie-player";
import animation from "@/app/animation/loading.json";

export function LoadingAnimated(props: any) {
  return (
    <Lottie animationData={animation as unknown as Animation} {...props} />
  );
}
