import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";

type LayoutProps = {
  children: ReactNode;
};

export default function HistoricoLayout({ children }: LayoutProps) {
  return <AppShell>{children}</AppShell>;
}
