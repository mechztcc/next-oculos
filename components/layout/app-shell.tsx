import type { ReactNode } from "react";

import { Sidebar } from "@/components/layout/sidebar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-full flex-1 bg-zinc-50 dark:bg-black">
      <Sidebar />
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
