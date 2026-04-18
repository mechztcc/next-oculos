"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ClipboardList, Store } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type StoredUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type HomeChoice = "vender" | "orcamento";

type ChoiceCard = {
  id: HomeChoice;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  testId: string;
};

const choices: ChoiceCard[] = [
  {
    id: "vender",
    title: "Quero vender na plataforma",
    subtitle: "Cadastre sua ótica e receba solicitações.",
    icon: Store,
    testId: "home-choice-sell-card",
  },
  {
    id: "orcamento",
    title: "Quero solicitar um orçamento",
    subtitle: "Envie sua necessidade e receba ofertas.",
    icon: ClipboardList,
    testId: "home-choice-quote-card",
  },
];

export function HomeOnboarding() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [selected, setSelected] = useState<HomeChoice | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<StoredUser>;
      if (typeof parsed.name === "string") setUserName(parsed.name);
    } catch {
      // ignore
    }
  }, []);

  const greeting = useMemo(() => {
    return `Bem-vindo${userName ? `, ${userName}` : ""}!`;
  }, [userName]);

  const handleAdvance = () => {
    if (!selected) return;

    if (selected === "orcamento") {
      router.push("/historico");
      return;
    }

    toast.message("Em breve", {
      description: "O fluxo de venda na plataforma estará disponível em breve.",
    });
  };

  return (
    <div className="mx-auto justify-center flex w-full max-w-2xl flex-col gap-6 px-4 py-10 sm:px-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {greeting}
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">O que deseja fazer?</p>
      </header>

      <div className="flex flex-col gap-3">
        {choices.map((choice) => {
          const Icon = choice.icon;
          const isSelected = selected === choice.id;

          return (
            <button
              key={choice.id}
              type="button"
              onClick={() => setSelected(choice.id)}
              className={cn(
                "group flex w-full items-center gap-4 rounded-xl border bg-white px-4 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 dark:bg-zinc-950",
                isSelected
                  ? "border-primary ring-1 ring-primary"
                  : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
              )}
              aria-pressed={isSelected}
              data-testid={choice.testId}
            >
              <div
                className={cn(
                  "flex size-11 items-center justify-center rounded-full border bg-zinc-50 text-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-200",
                  isSelected
                    ? "border-primary/30"
                    : "border-zinc-200 dark:border-zinc-800"
                )}
              >
                <Icon className="size-5" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {choice.title}
                </div>
                <div className="truncate text-xs text-zinc-600 dark:text-zinc-400">
                  {choice.subtitle}
                </div>
              </div>

              <div
                className={cn(
                  "flex size-6 items-center justify-center rounded-full border transition",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-zinc-200 bg-white text-transparent dark:border-zinc-800 dark:bg-zinc-950"
                )}
                aria-hidden="true"
              >
                <Check className="size-4" />
              </div>
            </button>
          );
        })}
      </div>

      <Button
        type="button"
        disabled={!selected}
        onClick={handleAdvance}
        className="w-full"
        data-testid="home-advance-button"
      >
        Avançar
      </Button>
    </div>
  );
}
