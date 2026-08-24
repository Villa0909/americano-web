"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const searchParams = useSearchParams();

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "/api/admin/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            password,
          }),
        }
      );

      if (!response.ok) {
        setError("Contraseña incorrecta.");
        return;
      }

      const redirect =
        searchParams.get("redirect") ||
        "/admin";

      window.location.href = redirect;
    } catch (error) {
      console.error(error);

      setError(
        "No se pudo iniciar sesión."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-xl sm:p-8">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black">
            MARTINCITAS
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Panel de administración
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-bold">
              Contraseña
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="••••••••"
              autoFocus
              className="w-full rounded-xl border border-zinc-300 bg-white p-3 text-black outline-none transition focus:border-black"
            />
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 p-3 text-center text-sm font-semibold text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={
              loading || !password
            }
            className="w-full rounded-xl bg-black px-6 py-3 font-black text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Comprobando..."
              : "Entrar"}
          </button>
        </form>

      </div>
    </main>
  );
}