"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type StepId = "shop" | "address";

type ShopFormValues = {
  name: string;
  description?: string;
  documentType: "CPF" | "CNPJ";
  document: string;
};

type AddressFormValues = {
  zipCode: string;
  street: string;
  city: string;
  state: string;
  country: string;
  lat?: number;
  lng?: number;
};

type StepDefinition = {
  id: StepId;
  title: string;
  subtitle: string;
  testId: string;
};

const steps: StepDefinition[] = [
  {
    id: "shop",
    title: "Loja",
    subtitle: "Dados da sua ótica",
    testId: "shop-wizard-step-shop",
  },
  {
    id: "address",
    title: "Endereço",
    subtitle: "Onde sua ótica fica",
    testId: "shop-wizard-step-address",
  },
];

export function ShopCreationWizard() {
  const [activeStep, setActiveStep] = useState<StepId>("shop");

  const formatDocument = (digits: string) => {
    const clean = digits.replace(/\D/g, "");
    if (clean.length <= 11) {
      const a = clean.slice(0, 3);
      const b = clean.slice(3, 6);
      const c = clean.slice(6, 9);
      const d = clean.slice(9, 11);

      if (clean.length <= 3) return a;
      if (clean.length <= 6) return `${a}.${b}`;
      if (clean.length <= 9) return `${a}.${b}.${c}`;
      return `${a}.${b}.${c}-${d}`;
    }

    const a = clean.slice(0, 2);
    const b = clean.slice(2, 5);
    const c = clean.slice(5, 8);
    const d = clean.slice(8, 12);
    const e = clean.slice(12, 14);

    if (clean.length <= 2) return a;
    if (clean.length <= 5) return `${a}.${b}`;
    if (clean.length <= 8) return `${a}.${b}.${c}`;
    if (clean.length <= 12) return `${a}.${b}.${c}/${d}`;
    return `${a}.${b}.${c}/${d}-${e}`;
  };

  const {
    register: registerShop,
    handleSubmit: handleSubmitShop,
    formState: { errors: shopErrors },
    control: shopControl,
    getValues: getShopValues,
    setValue: setShopValue,
    watch: watchShop,
  } = useForm<ShopFormValues>({
    defaultValues: {
      name: "",
      description: "",
      documentType: "CPF",
      document: "",
    },
  });

  const documentType = watchShop("documentType");
  const shopName = watchShop("name");
  const shopDocument = watchShop("document");

  const {
    register: registerAddress,
    handleSubmit: handleSubmitAddress,
    formState: { errors: addressErrors },
  } = useForm<AddressFormValues>({
    defaultValues: {
      zipCode: "",
      street: "",
      city: "",
      state: "",
      country: "Brasil",
      lat: undefined,
      lng: undefined,
    },
  });

  const completed = useMemo(() => {
    const shopVals = getShopValues();
    const shopOk =
      shopVals.name.trim().length > 0 &&
      shopVals.document.trim().length > 0 &&
      (shopVals.documentType === "CPF" || shopVals.documentType === "CNPJ");

    return {
      shop: shopOk,
    };
  }, [getShopValues, documentType, shopName, shopDocument]);

  const canGoToAddress = completed.shop;

  const goToStep = (step: StepId) => {
    if (step === "address" && !canGoToAddress) return;
    setActiveStep(step);
  };

  const onSubmitShop = handleSubmitShop(() => {
    setActiveStep("address");
  });

  const onSubmitAddress = handleSubmitAddress((values) => {
    void values;
  });

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Criar loja
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Preencha os dados para cadastrar sua ótica.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex flex-col gap-2">
            {steps.map((step, idx) => {
              const isActive = activeStep === step.id;
              const isCompleted = step.id === "shop" ? completed.shop : false;
              const isDisabled = step.id === "address" ? !canGoToAddress : false;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => goToStep(step.id)}
                  disabled={isDisabled}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-60",
                    isActive
                      ? "bg-zinc-50 dark:bg-zinc-900/40"
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-900/30"
                  )}
                  data-testid={step.testId}
                >
                  <div className="flex flex-col items-center gap-2 pt-1">
                    <div
                      className={cn(
                        "flex size-7 items-center justify-center rounded-full border text-xs",
                        isCompleted
                          ? "border-primary bg-primary text-primary-foreground"
                          : isActive
                            ? "border-primary text-primary"
                            : "border-zinc-200 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400"
                      )}
                      aria-hidden="true"
                    >
                      {isCompleted ? <Check className="size-4" /> : idx + 1}
                    </div>
                    {idx < steps.length - 1 ? (
                      <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800" aria-hidden="true" />
                    ) : null}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      {step.title}
                    </div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-400">
                      {step.subtitle}
                    </div>
                  </div>

                  {isActive ? (
                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      Em andamento
                    </span>
                  ) : isCompleted ? (
                    <span className="text-xs font-medium text-primary">Completo</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </aside>

        <main className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
          {activeStep === "shop" ? (
            <form onSubmit={onSubmitShop} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <Label htmlFor="shop-name">Nome da loja</Label>
                <Input
                  id="shop-name"
                  className="h-11 rounded-full"
                  placeholder="Ex.: Ótica Central"
                  data-testid="shop-form-name-input"
                  {...registerShop("name", { required: "Informe o nome da loja." })}
                />
                {shopErrors.name?.message ? (
                  <p className="text-xs text-red-500" role="alert" data-testid="shop-form-name-error">
                    {shopErrors.name.message}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="shop-description">Descrição</Label>
                <Textarea
                  id="shop-description"
                  className="min-h-[96px] resize-none rounded-xl"
                  placeholder="Uma breve descrição (opcional)"
                  data-testid="shop-form-description-input"
                  {...registerShop("description")}
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="shop-document">Documento</Label>
                <Controller
                  control={shopControl}
                  name="document"
                  rules={{ required: "Informe o documento." }}
                  render={({ field }) => (
                    <Input
                      id="shop-document"
                      className="h-11 rounded-full"
                      placeholder="Digite CPF ou CNPJ"
                      inputMode="numeric"
                      autoComplete="off"
                      data-testid="shop-form-document-input"
                      value={formatDocument(field.value ?? "")}
                      onChange={(e) => {
                        const digits = String(e.target.value).replace(/\D/g, "").slice(0, 14);
                        const inferredType = digits.length > 11 ? "CNPJ" : "CPF";

                        setShopValue("documentType", inferredType, {
                          shouldDirty: true,
                          shouldTouch: true,
                        });

                        field.onChange(digits);
                      }}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                  )}
                />

                <input id="shop-document-type" type="hidden" {...registerShop("documentType")} />

                {shopErrors.document?.message ? (
                  <p className="text-xs text-red-500" role="alert" data-testid="shop-form-document-error">
                    {shopErrors.document.message}
                  </p>
                ) : null}
              </div>

              <div className="flex items-center gap-3">
                <Button type="submit" className="w-full sm:w-auto" data-testid="shop-form-next-button">
                  Próximo
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={onSubmitAddress} className="flex flex-col gap-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="address-zip">CEP</Label>
                  <Input
                    id="address-zip"
                    className="h-11 rounded-full"
                    placeholder="00000-000"
                    data-testid="address-form-zip-input"
                    {...registerAddress("zipCode", { required: "Informe o CEP." })}
                  />
                  {addressErrors.zipCode?.message ? (
                    <p className="text-xs text-red-500" role="alert" data-testid="address-form-zip-error">
                      {addressErrors.zipCode.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="address-country">País</Label>
                  <Input
                    id="address-country"
                    className="h-11 rounded-full"
                    data-testid="address-form-country-input"
                    {...registerAddress("country")}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="address-street">Rua</Label>
                <Input
                  id="address-street"
                  className="h-11 rounded-full"
                  data-testid="address-form-street-input"
                  {...registerAddress("street", { required: "Informe a rua." })}
                />
                {addressErrors.street?.message ? (
                  <p className="text-xs text-red-500" role="alert" data-testid="address-form-street-error">
                    {addressErrors.street.message}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="address-city">Cidade</Label>
                  <Input
                    id="address-city"
                    className="h-11 rounded-full"
                    data-testid="address-form-city-input"
                    {...registerAddress("city", { required: "Informe a cidade." })}
                  />
                  {addressErrors.city?.message ? (
                    <p className="text-xs text-red-500" role="alert" data-testid="address-form-city-error">
                      {addressErrors.city.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="address-state">Estado</Label>
                  <Input
                    id="address-state"
                    className="h-11 rounded-full"
                    placeholder="Ex.: SP"
                    data-testid="address-form-state-input"
                    {...registerAddress("state", { required: "Informe o estado." })}
                  />
                  {addressErrors.state?.message ? (
                    <p className="text-xs text-red-500" role="alert" data-testid="address-form-state-error">
                      {addressErrors.state.message}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="address-lat">Latitude (opcional)</Label>
                  <Input
                    id="address-lat"
                    className="h-11 rounded-full"
                    placeholder="Ex.: -23.5505"
                    data-testid="address-form-lat-input"
                    {...registerAddress("lat", { valueAsNumber: true })}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="address-lng">Longitude (opcional)</Label>
                  <Input
                    id="address-lng"
                    className="h-11 rounded-full"
                    placeholder="Ex.: -46.6333"
                    data-testid="address-form-lng-input"
                    {...registerAddress("lng", { valueAsNumber: true })}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveStep("shop")}
                  className="w-full sm:w-auto"
                  data-testid="address-form-back-button"
                >
                  Voltar
                </Button>

                <Button type="submit" className="w-full sm:w-auto" data-testid="address-form-finish-button">
                  Finalizar
                </Button>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}
