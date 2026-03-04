"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {!isLoginPage && (
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/admin/articles" className="flex items-center gap-3">
                <Image
                  src="/Logo.svg"
                  alt="Clinequal"
                  width={120}
                  height={28}
                  className="h-7 w-auto dark:brightness-0 dark:invert"
                />
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Admin
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </header>
      )}
      <main className={isLoginPage ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"}>
        {children}
      </main>
    </div>
  );
}
