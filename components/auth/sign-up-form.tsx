"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "sonner";

import type { SignUpFormValues } from "@/types/forms";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldStatusLabel } from "@/components/forms/field-status-label";

export function SignUpForm() {
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
  } = useForm<SignUpFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    clearErrors();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
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

        if (error?.field === "name") {
          setError("name", { message: error.message });
          toast.error(error.message);
          return;
        }

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

        toast.error(error?.message ?? "Não foi possível criar a conta.");
        return;
      }

      toast.success("Conta criada com sucesso!");
      reset();
    } catch {
      toast.error("Não foi possível criar a conta. Tente novamente.");
    }
  });

  const nameValue = watch("name");
  const emailValue = watch("email");
  const passwordValue = watch("password");

  const nameState = getFieldState("name");
  const emailState = getFieldState("email");
  const passwordState = getFieldState("password");

  const showNameStatus = Boolean(nameValue) && (nameState.isTouched || nameState.isDirty);
  const showEmailStatus = Boolean(emailValue) && (emailState.isTouched || emailState.isDirty);
  const showPasswordStatus =
    Boolean(passwordValue) && (passwordState.isTouched || passwordState.isDirty);

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <FieldStatusLabel
          htmlFor="name"
          label="Nome"
          showStatus={showNameStatus}
          invalid={nameState.invalid}
          className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        />
        <div className="relative">
          <Input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Digite seu nome"
            className="h-12 rounded-full border-zinc-200 bg-white px-4 text-sm text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
            data-testid="signup-name-input"
            aria-invalid={Boolean(errors.name) || undefined}
            {...register("name", {
              required: "Informe seu nome.",
              minLength: { value: 3, message: "O nome deve ter no mínimo 3 caracteres." },
              maxLength: { value: 20, message: "O nome deve ter no máximo 20 caracteres." },
            })}
          />
        </div>
        {errors.name?.message ? (
          <p
            className="mt-1 text-xs text-red-500"
            data-testid="signup-name-error"
            role="alert"
          >
            {errors.name.message}
          </p>
        ) : null}
      </div>

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
            data-testid="signup-email-error"
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
            autoComplete="new-password"
            placeholder="Crie uma senha"
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
            className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 rounded-full px-3 py-2 text-xs font-medium text-zinc-600 hover:bg-transparent hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-transparent dark:hover:text-zinc-50"
            data-testid="login-toggle-password-button"
          >
            {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
          </Button>
        </div>
        {errors.password?.message ? (
          <p
            className="mt-1 text-xs text-red-500"
            data-testid="signup-password-error"
            role="alert"
          >
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full"
        data-testid="login-submit-button"
      >
        {isSubmitting ? "Criando..." : "Criar conta"}
      </Button>
    </form>
  );
}
