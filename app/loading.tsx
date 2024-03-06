import { lazy } from "react";

const Animated = lazy(() =>
  import("@/app/components/common/animations/LoadingAnimated").then(
    (module) => ({ default: module.LoadingAnimated })
  )
);

export default function Loading() {
  return (
    <div className="center h-screen">
      <Animated play />
    </div>
  );
}
