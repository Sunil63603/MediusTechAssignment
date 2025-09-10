import React from "react";
import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Better Replica",
  description: "Replica of Better.com pages — Home, About, Calculator, Start",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-slate-900">
        <div className="min-h-screen flex flex-col">
          {/* Global header */}
          <header className="w-full border-b bg-white/60 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-md bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                    B
                  </div>
                  <span className="font-semibold text-lg">Better Replica</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm">
                  <Link href="/mortgage-calc" className="hover:underline">
                    Mortgage Calculator
                  </Link>
                  <Link href="/start" className="hover:underline">
                    Start
                  </Link>
                  <Link href="/about-us" className="hover:underline">
                    About Us
                  </Link>
                  <Link
                    href="/start"
                    className="inline-flex items-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:opacity-95"
                  >
                    Get started
                  </Link>
                </nav>

                {/* mobile menu placeholder */}
                <div className="md:hidden">
                  <button
                    type="button"
                    aria-label="Open menu"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-white"
                  >
                    ☰
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1">{children}</main>

          {/* Global footer */}
          <footer className="mt-8 border-t">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <div className="mb-2 font-semibold">Better Replica</div>
                  <p className="text-sm text-slate-600">
                    Making homeownership simpler — replica for assignment.
                  </p>
                </div>

                <div>
                  <div className="mb-2 font-semibold">Company</div>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>
                      <Link href="/about-us" className="hover:underline">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/start" className="hover:underline">
                        Start
                      </Link>
                    </li>
                    <li>
                      <Link href="/mortgage-calc" className="hover:underline">
                        Calculator
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="mb-2 font-semibold">Legal</div>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>Privacy</li>
                    <li>Terms</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 text-center text-sm text-slate-500">
                © {new Date().getFullYear()} Better Replica — for assignment use
                only
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
