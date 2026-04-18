"use client";

import { useEffect, useState } from "react";

type StoredUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function UserHomePage() {
  const [userName, setUserName] = useState<string>("");

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

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Bem-vindo{userName ? `, ${userName}` : ""}!
        </h1>
      </div>
    </div>
  );
}
