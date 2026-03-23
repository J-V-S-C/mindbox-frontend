"use client";

import { useActionState } from "react";
import { register } from "../lib/auth/register";
import Link from "next/link";

export default function RegisterForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    register,
    undefined,
  );

  return (
    <main className="flex min-h-screen flex-col items-center mt-4 bg-[var(--color-base)] px-4 py-12">
      <Link
        href="/"
        className="mb-8 text-5xl font-light italic text-[var(--color-ink)] no-underline tracking-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        MindBox
      </Link>

      <div className="w-full max-w-md animate-fade-up rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] px-8 py-10 shadow-xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-amber)] mb-3">
            Get Started
          </p>
          <h2 className="text-2xl font-normal text-[var(--color-ink)]" style={{ fontFamily: "var(--font-display)" }}>
            Create your account
          </h2>
        </div>

        <form action={formAction} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--color-ink-muted)]">Name</label>
              <input
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-base)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] focus:outline-none focus:border-[var(--color-amber)] transition-colors"
                name="name"
                type="text"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--color-ink-muted)]">Email</label>
              <input
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-base)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] focus:outline-none focus:border-[var(--color-amber)] transition-colors"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--color-ink-muted)]">Password</label>
              <input
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-base)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] focus:outline-none focus:border-[var(--color-amber)] transition-colors"
                name="password"
                type="password"
                placeholder="Create a password"
                minLength={6}
                required
              />
            </div>
          </div>

          <button
            className="w-full rounded-xl bg-[var(--color-amber)] px-4 py-3 text-sm font-semibold text-white hover:bg-[var(--color-amber-dark)] transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
            disabled={isPending}
          >
            {isPending ? "Signing up..." : "Sign up"}
          </button>

          {errorMessage && (
            <div className="mt-4 rounded-xl border border-red-900/40 bg-red-900/20 px-4 py-3 text-center animate-fade-up">
              <p className="text-sm font-medium text-red-400">{errorMessage}</p>
            </div>
          )}
        </form>

        <div className="mt-8 text-center text-sm text-[var(--color-ink-muted)] border-t border-[var(--color-border)] pt-8">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[var(--color-amber)] hover:text-[var(--color-amber-dark)] transition-colors no-underline">
            Log in
          </Link>
        </div>
      </div>
    </main>
  );
}
