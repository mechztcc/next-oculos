"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldStatusLabel } from "@/components/forms/field-status-label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";

import type { SignInFormValues } from "@/types/forms";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    reset,
    getFieldState,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    clearErrors();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const json = (await res.json().catch(() => null)) as
        | {
            ok: true;
            data: { user: { id: string; name: string; email: string; role: string } };
          }
        | {
            ok: false;
            error: { code: string; message: string; field?: string };
          }
        | null;

      if (!json || json.ok === false) {
        const error = json?.error;

        if (error?.field === "email") {
          setError("email", { message: error.message });
          toast.error(error.message);
          return;
        }

        if (error?.field === "password") {
          setError("password", { message: error.message });
          toast.error(error.message);
          return;
        }

        if (error?.code === "INVALID_CREDENTIALS") {
          toast.error("Credenciais inválidas.");
          return;
        }

        toast.error(error?.message ?? "Não foi possível entrar.");
        return;
      }

      toast.success("Login realizado com sucesso!");
      reset();
      // TODO: persistir sessão (cookie/jwt) e redirecionar
    } catch {
      toast.error("Não foi possível entrar. Tente novamente.");
    }
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const emailState = getFieldState("email");
  const passwordState = getFieldState("password");

  const showEmailStatus = Boolean(emailValue) && (emailState.isTouched || emailState.isDirty);
  const showPasswordStatus =
    Boolean(passwordValue) && (passwordState.isTouched || passwordState.isDirty);

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <FieldStatusLabel
          htmlFor="email"
          label="Email"
          showStatus={showEmailStatus}
          invalid={emailState.invalid}
          className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        />
        <div className="relative">
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Digite seu email"
            className="h-12 rounded-full border-zinc-200 bg-white px-4 text-sm text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
            data-testid="login-email-input"
            aria-invalid={Boolean(errors.email) || undefined}
            {...register("email", {
              required: "Informe seu email.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Informe um email válido.",
              },
            })}
          />
        </div>
        {errors.email?.message ? (
          <p
            className="mt-1 text-xs text-red-500"
            data-testid="login-email-error"
            role="alert"
          >
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div>
        <FieldStatusLabel
          htmlFor="password"
          label="Senha"
          showStatus={showPasswordStatus}
          invalid={passwordState.invalid}
          className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        />
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Digite sua senha"
            className="h-12 rounded-full border-zinc-200 bg-white px-4 pr-12 text-sm text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
            data-testid="login-password-input"
            aria-invalid={Boolean(errors.password) || undefined}
            {...register("password", { required: "Informe sua senha." })}
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
            {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
          </Button>
        </div>
        {errors.password?.message ? (
          <p
            className="mt-1 text-xs text-red-500"
            data-testid="login-password-error"
            role="alert"
          >
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-4">
        <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <input
            type="checkbox"
            className="size-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-700"
            data-testid="login-rememberme-checkbox"
            {...register("rememberMe")}
          />
          Lembrar de mim
        </label>

        <Button
          type="button"
          variant="link"
          className="h-auto p-0 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400"
          data-testid="login-forgot-password-button"
        >
          Esqueci minha senha
        </Button>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 h-12 w-full rounded-full bg-blue-600 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        data-testid="login-submit-button"
      >
        {isSubmitting ? "Entrando..." : "Entrar"}
      </Button>

      <div className="relative py-2">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-zinc-200 dark:bg-zinc-800" />
        <div className="relative mx-auto w-fit bg-zinc-50 px-3 text-xs font-medium text-zinc-500 dark:bg-black dark:text-zinc-500">
          ou
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="h-12 w-full rounded-full border-zinc-200 bg-white text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
        data-testid="login-google-button"
      >
        Entrar com Google
      </Button>
    </form>
  );
}
