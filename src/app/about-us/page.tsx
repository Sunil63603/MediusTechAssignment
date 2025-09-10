//about us page

import React from "react";
import Link from "next/link";
import { type JSX } from "react";

// shadcn components (assumes shadcn components are available)
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AboutPage(): JSX.Element {
  const timeline = [
    {
      year: "2014",
      text: "Company founded with a mission to simplify homeownership.",
    },
    {
      year: "2016",
      text: "Expanded our product lineup and launched refinance tools.",
    },
    {
      year: "2019",
      text: "Reached 100k customers and improved our underwriting tech.",
    },
    {
      year: "2022",
      text: "Scaled nationwide and launched new digital mortgage experience.",
    },
    {
      year: "Today",
      text: "Continuing to innovate around speed, transparency, and value.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          About Us
        </h1>
        <p className="mt-6 text-lg text-slate-600">
          We’re on a mission to make homeownership simpler, faster, and more
          transparent. Our products combine modern technology with experienced
          mortgage professionals so you get a better experience from application
          to closing.
        </p>

        <div className="mt-8 flex gap-3">
          <Link href="/start">
            <Button>Get started</Button>
          </Link>
          <Link href="/mortgage-calculator">
            <Button variant="ghost">Try calculator</Button>
          </Link>
        </div>
      </section>

      <Separator />

      {/* Status Quo + How We Fix It */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold">The status quo is broken</h2>
            <p className="mt-4 text-slate-600">
              Traditional mortgage lending is slow, confusing, and full of
              paperwork. We build tools and processes to remove friction and
              give borrowers clarity at every step.
            </p>

            <ul className="mt-6 space-y-3 text-slate-700">
              <li>Faster digital application and document upload</li>
              <li>Transparent pricing and clear timelines</li>
              <li>Modern underwriting that reduces surprises</li>
            </ul>
          </div>

          <div className="relative">
            <div className="h-56 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 flex items-center justify-center">
              <span className="text-slate-300">[Illustration]</span>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Timeline */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold">Our journey</h2>
        <p className="mt-2 text-slate-600">
          A quick timeline of milestones that shaped the company.
        </p>

        <div className="mt-8 space-y-6">
          {timeline.map((item, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>{item.year}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Values / Team Highlights */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold">What we value</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              Clear pricing, clear timelines, and no surprises.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Speed</CardTitle>
            </CardHeader>
            <CardContent>
              Streamlined processes to help you close faster.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer focus</CardTitle>
            </CardHeader>
            <CardContent>
              Real people and support when you need it most.
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />
    </main>
  );
}
