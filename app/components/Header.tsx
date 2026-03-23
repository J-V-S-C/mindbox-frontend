import Link from 'next/link';
import { cookies } from 'next/headers';
import { logout } from '@/app/lib/auth/logout';

export async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[var(--color-surface)] border-b border-[var(--color-border)] sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold tracking-tight text-[var(--color-ink)] no-underline">
        MindBox
      </Link>
      
      <div className="flex items-center gap-4">
        {token ? (
          <form action={logout}>
            <button className="text-sm font-medium px-4 py-2 rounded-lg border border-[var(--color-border)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:border-[var(--color-border-strong)] transition-all duration-200 cursor-pointer">
              Logout
            </button>
          </form>
        ) : (
          <>
            <Link href="/login" className="text-sm font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors duration-200 no-underline">
              Log in
            </Link>
            <Link href="/register" className="text-sm font-medium px-4 py-2 rounded-lg bg-[var(--color-amber)] text-white hover:bg-[var(--color-amber-dark)] transition-colors duration-200 no-underline shadow-sm">
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
