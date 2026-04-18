import { NextResponse } from "next/server";
import { email, object, pipe, safeParse, string, toLowerCase, trim } from "valibot";

import { AuthService } from "@/services/auth.service";

const loginSchema = object({
  email: pipe(string("Informe seu email."), trim(), toLowerCase(), email("Informe um email válido.")),
  password: pipe(string("Informe sua senha."), trim()),
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

  const parsed = safeParse(loginSchema, body);
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

  const { email: userEmail, password } = parsed.output;

  try {
    const user = await AuthService.loginUser({ email: userEmail, password });

    return NextResponse.json(
      {
        ok: true,
        data: {
          user,
        },
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const code =
      err && typeof err === "object" && "code" in err ? String((err as any).code) : "UNKNOWN";

    if (code === "INVALID_CREDENTIALS") {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "INVALID_CREDENTIALS",
            message: "Credenciais inválidas.",
          },
        },
        { status: 401 }
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
