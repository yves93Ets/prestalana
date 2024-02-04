
import { lazy } from "react";
const LoadingAnimated = lazy(
  () => import("./components/common/LoadingAnimated")
);

export default function Loading() {
  return (
    <div className="center h-screen">
      <LoadingAnimated play />
    </div>
  );
}
