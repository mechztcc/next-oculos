"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { History, Home } from "lucide-react";

const navItems = [
  {
    href: "/home",
    label: "Home",
    icon: Home,
    testId: "sidebar-home-link",
  },
  {
    href: "/historico",
    label: "Histórico",
    icon: History,
    testId: "sidebar-historico-link",
  },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col justify-between w-64 shrink-0 border-r border-zinc-200 bg-white px-3 py-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-col">
        <div className="px-2 pb-4">
          <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">next-óculos</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Painel do usuário</div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                data-testid={item.testId}
                className={
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition " +
                  (active
                    ? "bg-primary text-zinc-50 "
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-zinc-50")
                }
                aria-current={active ? "page" : undefined}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <Link href="/login" className="mb-10 block text-sm text-red-600 hover:underline">
        Sair
      </Link>
    </aside>
  );
}
