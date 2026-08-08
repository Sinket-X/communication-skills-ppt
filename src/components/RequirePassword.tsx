import { useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { isUnlocked } from "@/lib/gate";

export function RequirePassword({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [unlocked] = useState(() => isUnlocked());

  if (!unlocked) {
    const returnTo = `${location.pathname}${location.search}`;
    return (
      <Navigate
        to={`/signin?returnTo=${encodeURIComponent(returnTo)}`}
        replace
      />
    );
  }

  return children;
}
