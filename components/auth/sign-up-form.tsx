"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError(null);

    if (!email.trim()) {
      setError("Informe seu email.");
      return;
    }

    if (!password) {
      setError("Informe sua senha.");
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      // Placeholder: integrar com /app/api/auth/register depois
    } catch {
      setError("Não foi possível criar a conta. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <Label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Email
        </Label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            className="h-12 rounded-full border-zinc-200 bg-white px-4 text-sm text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
            data-testid="login-email-input"
          />
        </div>
      </div>

      <div>
        <Label
          htmlFor="password"
          className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Senha
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Crie uma senha"
            className="h-12 rounded-full border-zinc-200 bg-white px-4 pr-12 text-sm text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
            data-testid="login-password-input"
          />
          <Button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            variant="ghost"
            size="xs"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-3 py-2 text-xs font-medium text-zinc-600 hover:bg-transparent hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-transparent dark:hover:text-zinc-50"
            data-testid="login-toggle-password-button"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </Button>
        </div>
      </div>

      {error ? (
        <div
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
          data-testid="login-error-alert"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 h-12 w-full rounded-full bg-blue-600 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        data-testid="login-submit-button"
      >
        {isSubmitting ? "Criando..." : "Criar conta"}
      </Button>
    </form>
  );
}
