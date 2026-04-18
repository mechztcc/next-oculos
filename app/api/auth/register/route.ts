import { NextResponse } from "next/server";
import {
  email,
  maxLength,
  minLength,
  object,
  pipe,
  safeParse,
  string,
  toLowerCase,
  trim,
} from "valibot";

import { AuthService } from "@/services/auth.service";

const registerSchema = object({
  name: pipe(
    string("Informe seu nome."),
    trim(),
    minLength(3, "O nome deve ter no mínimo 3 caracteres."),
    maxLength(20, "O nome deve ter no máximo 20 caracteres.")
  ),
  email: pipe(
    string("Informe seu email."),
    trim(),
    toLowerCase(),
    email("Informe um email válido.")
  ),
  password: pipe(
    string("Informe sua senha."),
    minLength(8, "A senha deve ter no mínimo 8 caracteres.")
  ),
});

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = (await req.json()) as unknown;
  } catch {
    return NextResponse.json(
      { ok: false, error: { code: "INVALID_JSON", message: "JSON inválido." } },
      { status: 400 }
    );
  }

  const parsed = safeParse(registerSchema, body);
  if (!parsed.success) {
    const issue = parsed.issues[0];
    const field = issue?.path?.[0]?.key;

    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "VALIDATION_ERROR",
          field: typeof field === "string" ? field : undefined,
          message: issue?.message ?? "Dados inválidos.",
        },
      },
      { status: 400 }
    );
  }

  const { name, email: userEmail, password } = parsed.output;

  try {
    const user = await AuthService.registerUser({
      name,
      email: userEmail,
      password,
    });
    return NextResponse.json({ ok: true, data: { user } }, { status: 201 });
  } catch (err: unknown) {
    const code =
      err && typeof err === "object" && "code" in err ? String((err as any).code) : "UNKNOWN";

    if (code === "EMAIL_IN_USE") {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "EMAIL_IN_USE",
            field: "email",
            message: "Email já cadastrado.",
          },
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Erro interno.",
        },
      },
      { status: 500 }
    );
  }
}
