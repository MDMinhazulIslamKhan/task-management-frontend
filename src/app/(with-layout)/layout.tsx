"use client";
import React, { useEffect } from "react";
import DashboardSidebar from "@/components/ui/DashboardSidebar";
import { isLoggedIn } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const App = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/");
    }
  }, [router]);
  return (
    <DashboardSidebar>
      <div className="h-screen">{children}</div>
    </DashboardSidebar>
  );
};

export default App;
