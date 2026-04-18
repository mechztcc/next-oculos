"use client";

import { Button } from "@/components/ui/button";
import { SignInForm } from "@/components/auth/sign-in-form";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { useMemo, useState } from "react";

type Mode = "signin" | "signup";

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("signin");

  const title = useMemo(() => {
    return mode === "signin" ? "Bem-vindo de volta" : "Crie sua conta";
  }, [mode]);

  const subtitle = useMemo(() => {
    return mode === "signin"
      ? "Entre para continuar"
      : "Comece a receber e enviar orçamentos";
  }, [mode]);

  return (
    <div className="w-full max-w-sm">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
            <span className="text-sm font-semibold">NO</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              next-oculos
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {title}
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          {subtitle}
        </p>
      </div>

      <div className="mb-6 rounded-full bg-zinc-100 p-1 dark:bg-zinc-900">
        <div className="grid grid-cols-2">
          <Button
            type="button"
            onClick={() => setMode("signin")}
            variant="ghost"
            className={`h-10 rounded-full text-sm font-medium transition-colors hover:bg-transparent ${
              mode === "signin"
                ? "bg-white text-zinc-900 shadow-sm hover:bg-white dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            }`}
            data-testid="login-signin-tab"
          >
            Entrar
          </Button>
          <Button
            type="button"
            onClick={() => setMode("signup")}
            variant="ghost"
            className={`h-10 rounded-full text-sm font-medium transition-colors hover:bg-transparent ${
              mode === "signup"
                ? "bg-white text-zinc-900 shadow-sm hover:bg-white dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            }`}
            data-testid="login-signup-tab"
          >
            Criar conta
          </Button>
        </div>
      </div>

      {mode === "signin" ? <SignInForm /> : <SignUpForm />}

      <p className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-500">
        © {new Date().getFullYear()} next-oculos
      </p>
    </div>
  );
}
