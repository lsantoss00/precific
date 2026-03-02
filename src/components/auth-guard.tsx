"use client";

import { useAuth } from "@/src/providers/auth-provider";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isLoadingAuth } = useAuth();

  if (isLoadingAuth)
    return <Loader2 className="text-primary animate-spin w-12 h-12 m-auto" />;

  return <>{children}</>;
}
