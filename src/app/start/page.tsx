import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { JSX } from "react";

export default function StartPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero / Assistant */}
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-xl">
          <div className="mx-auto h-28 w-28 rounded-full bg-sky-50 flex items-center justify-center text-sky-400 text-4xl font-bold">
            B
          </div>
          <h1 className="mt-6 text-3xl font-extrabold sm:text-4xl">
            Hi, I’m Betsy — I’ll help you get started
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Choose an option and we’ll walk you through a few short steps.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Link href="/start/purchase" className="">
              <Card className="cursor-pointer hover:shadow-md">
                <CardHeader>
                  <CardTitle>Start purchase</CardTitle>
                </CardHeader>
                <CardContent>
                  Tell us about the home you want to buy — we’ll show an
                  estimate and next steps.
                </CardContent>
              </Card>
            </Link>

            <Link href="/start/refinance">
              <Card className="cursor-pointer hover:shadow-md">
                <CardHeader>
                  <CardTitle>Start refinance</CardTitle>
                </CardHeader>
                <CardContent>
                  Lower your monthly payments or change your loan term.
                </CardContent>
              </Card>
            </Link>

            <Link href="/start/heloc">
              <Card className="cursor-pointer hover:shadow-md">
                <CardHeader>
                  <CardTitle>Start HELOC</CardTitle>
                </CardHeader>
                <CardContent>
                  Tap into your home equity with flexible access to funds.
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border p-5">
              <div className="text-3xl font-bold">$100B+</div>
              <div className="mt-1 text-sm text-slate-600">
                Home loans funded
              </div>
            </div>

            <div className="rounded-lg border p-5">
              <div className="text-3xl font-bold">400K+</div>
              <div className="mt-1 text-sm text-slate-600">
                Customers served
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold">Why customers choose us</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Custom rates</CardTitle>
            </CardHeader>
            <CardContent>
              See rates tailored to your profile and home.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fast closing</CardTitle>
            </CardHeader>
            <CardContent>
              Streamlined process with digital docs and e-signatures.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personal support</CardTitle>
            </CardHeader>
            <CardContent>
              Dedicated loan experts to guide you through closing.
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />
    </main>
  );
}
