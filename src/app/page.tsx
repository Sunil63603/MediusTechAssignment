//home page

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { type JSX } from "react";

// shadcn components (assumes you ran `shadcn` setup and these exist)
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function HomePage(): JSX.Element {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                The first AI‑powered Mortgage
              </h1>
              <p className="mt-6 max-w-xl text-lg text-slate-600">
                Our tech unlocks faster approvals and better rates so you can
                buy the home you want — without the usual stress.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/start">
                  <Button className="min-w-[160px]">Get started</Button>
                </Link>
                <Link href="/mortgage-calculator">
                  <Button variant="ghost" className="min-w-[160px]">
                    Try calculator
                  </Button>
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-100" />
                  <div>
                    <div className="text-sm font-semibold">4.4/5</div>
                    <div className="text-xs text-slate-500">
                      based on customer reviews
                    </div>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
                  <span>Trusted by</span>
                  <div className="flex -space-x-2">
                    {/* placeholder avatars */}
                    <div className="h-8 w-8 rounded-full bg-slate-200" />
                    <div className="h-8 w-8 rounded-full bg-slate-300" />
                    <div className="h-8 w-8 rounded-full bg-slate-200" />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              {/* hero illustration placeholder */}
              <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 sm:h-80 lg:h-96">
                {/* Use next/image with a placeholder or local asset; keeping a simple decorative block */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-slate-300">[Hero Illustration]</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Features / Cards */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">What we offer</h2>
        <p className="mt-2 text-slate-600">
          Modern mortgage products, transparent pricing, and fast approvals.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>One Day Mortgage</CardTitle>
            </CardHeader>
            <CardContent>
              Close faster with our streamlined process and digital docs.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Refinance</CardTitle>
            </CardHeader>
            <CardContent>
              Lower your monthly payments with a competitive refinance rate.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Home Equity</CardTitle>
            </CardHeader>
            <CardContent>
              Tap into your home equity with a flexible HELOC product.
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* CTA Strip */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
              <h3 className="text-xl font-semibold">Ready to see your rate?</h3>
              <p className="mt-1 text-sm text-slate-600">
                Get an estimate in minutes — no hard credit pull.
              </p>
            </div>

            <div className="flex gap-3">
              <Link href="/mortgage-calculator">
                <Button>Use calculator</Button>
              </Link>
              <Link href="/start">
                <Button variant="outline">Start application</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Separator />
    </main>
  );
}
