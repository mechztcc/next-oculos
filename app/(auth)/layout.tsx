import type { ReactNode } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex flex-1 bg-zinc-50 dark:bg-black">
      <div className="flex w-full flex-col lg:flex-row">
        <div className="flex w-full items-center justify-center px-6 py-12 lg:w-[520px] lg:px-10">
          {children}
        </div>

        <div className="relative hidden flex-1 lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-700" />
          <div className="absolute inset-0 opacity-30 [background:radial-gradient(90rem_60rem_at_20%_20%,rgba(255,255,255,0.45),transparent_60%)]" />
        </div>
      </div>
    </div>
  );
}
