import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/password";

type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
};

type LoginUserInput = {
  email: string;
  password: string;
};

function isPrismaKnownRequestError(err: unknown): err is { code: string } {
  return Boolean(
    err &&
      typeof err === "object" &&
      "code" in err &&
      typeof (err as any).code === "string"
  );
}

export class AuthService {
  static async registerUser(input: RegisterUserInput) {
    const passwordHash = await hashPassword(input.password);

    try {
      const user = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          passwordHash,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      return user;
    } catch (err: unknown) {
      if (isPrismaKnownRequestError(err) && err.code === "P2002") {
        const error = new Error("Email já cadastrado.");
        (error as any).code = "EMAIL_IN_USE";
        throw error;
      }

      throw err;
    }
  }

  static async loginUser(input: LoginUserInput) {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        passwordHash: true,
      },
    });

    if (!user) {
      const error = new Error("Credenciais inválidas.");
      (error as any).code = "INVALID_CREDENTIALS";
      throw error;
    }

    const ok = await verifyPassword(input.password, user.passwordHash);
    if (!ok) {
      const error = new Error("Credenciais inválidas.");
      (error as any).code = "INVALID_CREDENTIALS";
      throw error;
    }

    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }
}
