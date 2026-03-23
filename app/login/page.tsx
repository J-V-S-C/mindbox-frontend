import { Suspense } from "react";
import LoginForm from "../components/login-form";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--color-base)] flex items-center justify-center text-[var(--color-ink)] animate-pulse">Loading login...</div>}>
      <LoginForm />
    </Suspense>
  );
}
