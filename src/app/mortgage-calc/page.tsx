"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { JSX } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function MortgageCalculatorPage(): JSX.Element {
  const STORAGE_KEY = "mortgage_calc_form_v1";

  // Defaults
  const DEFAULTS = {
    homePrice: 350000,
    downPercent: 20,
    termYears: 30,
    interestRate: 6.5,
    propTaxMonthly: 265, // given in assignment example (treated as monthly)
    insuranceMonthly: 100,
    hoaMonthly: 0,
    zip: "",
  };

  // Form state
  const [homePrice, setHomePrice] = useState<number>(DEFAULTS.homePrice);
  const [downPercent, setDownPercent] = useState<number>(DEFAULTS.downPercent);
  const [downAmount, setDownAmount] = useState<number>(
    Math.round((DEFAULTS.homePrice * DEFAULTS.downPercent) / 100)
  );
  const [termYears, setTermYears] = useState<number>(DEFAULTS.termYears);
  const [interestRate, setInterestRate] = useState<number>(
    DEFAULTS.interestRate
  );
  const [propTaxMonthly, setPropTaxMonthly] = useState<number>(
    DEFAULTS.propTaxMonthly
  );
  const [insuranceMonthly, setInsuranceMonthly] = useState<number>(
    DEFAULTS.insuranceMonthly
  );
  const [hoaMonthly, setHoaMonthly] = useState<number>(DEFAULTS.hoaMonthly);
  const [zip, setZip] = useState<string>(DEFAULTS.zip);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.homePrice) setHomePrice(Number(parsed.homePrice));
        if (parsed.downPercent) setDownPercent(Number(parsed.downPercent));
        if (parsed.downAmount) setDownAmount(Number(parsed.downAmount));
        if (parsed.termYears) setTermYears(Number(parsed.termYears));
        if (parsed.interestRate) setInterestRate(Number(parsed.interestRate));
        if (parsed.propTaxMonthly)
          setPropTaxMonthly(Number(parsed.propTaxMonthly));
        if (parsed.insuranceMonthly)
          setInsuranceMonthly(Number(parsed.insuranceMonthly));
        if (parsed.hoaMonthly) setHoaMonthly(Number(parsed.hoaMonthly));
        if (parsed.zip) setZip(String(parsed.zip));
      }
    } catch (e) {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist to localStorage when inputs change
  useEffect(() => {
    const payload = {
      homePrice,
      downPercent,
      downAmount,
      termYears,
      interestRate,
      propTaxMonthly,
      insuranceMonthly,
      hoaMonthly,
      zip,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      // ignore quota errors
    }
  }, [
    homePrice,
    downPercent,
    downAmount,
    termYears,
    interestRate,
    propTaxMonthly,
    insuranceMonthly,
    hoaMonthly,
    zip,
  ]);

  // Sync down amount/percent when either changes (handlers to avoid loop)
  const handleHomePriceChange = (val: number) => {
    const v = Math.max(0, Math.round(val));
    setHomePrice(v);
    // recalc downAmount based on current percent
    setDownAmount(Math.round((v * downPercent) / 100));
  };

  const handleDownPercentChange = (p: number) => {
    const v = Math.min(100, Math.max(0, Number(p)));
    setDownPercent(v);
    setDownAmount(Math.round((homePrice * v) / 100));
  };

  const handleDownAmountChange = (amt: number) => {
    const v = Math.max(0, Math.round(amt));
    setDownAmount(v);
    setDownPercent(homePrice > 0 ? +((v / homePrice) * 100).toFixed(2) : 0);
  };

  // Core calculations
  const principal = Math.max(0, homePrice - downAmount);
  const monthlyRate = interestRate / 100 / 12;
  const n = Math.max(1, termYears * 12);

  let monthlyPrincipalAndInterest = 0;
  if (principal <= 0) monthlyPrincipalAndInterest = 0;
  else if (monthlyRate === 0) monthlyPrincipalAndInterest = principal / n;
  else {
    const pow = Math.pow(1 + monthlyRate, n);
    monthlyPrincipalAndInterest = (principal * monthlyRate * pow) / (pow - 1);
  }

  // PMI estimate: apply only when down < 20%
  const pmiAnnualRate = 0.005; // 0.5% annual (estimate) — typical PMI ranges vary; this is an estimate
  const pmiMonthly = downPercent < 20 ? (principal * pmiAnnualRate) / 12 : 0;

  const totalMonthlyPayment =
    monthlyPrincipalAndInterest +
    propTaxMonthly +
    insuranceMonthly +
    hoaMonthly +
    pmiMonthly;

  // Useful summaries
  const totalMonths = n;
  const totalPaidPrincipalAndInterest =
    monthlyPrincipalAndInterest * totalMonths;
  const totalInterestPaid = Math.max(
    0,
    totalPaidPrincipalAndInterest - principal
  );
  const totalPaidAll = totalMonthlyPayment * totalMonths;

  const currency = (v: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(v);

  const currency2 = (v: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(v);

  const resetToDefaults = () => {
    handleHomePriceChange(DEFAULTS.homePrice);
    handleDownPercentChange(DEFAULTS.downPercent);
    setTermYears(DEFAULTS.termYears);
    setInterestRate(DEFAULTS.interestRate);
    setPropTaxMonthly(DEFAULTS.propTaxMonthly);
    setInsuranceMonthly(DEFAULTS.insuranceMonthly);
    setHoaMonthly(DEFAULTS.hoaMonthly);
    setZip(DEFAULTS.zip);
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left: Form */}
          <div className="lg:col-span-7">
            <h1 className="text-2xl font-extrabold">Mortgage Calculator</h1>
            <p className="mt-2 text-slate-600">
              Estimate monthly payments, taxes, insurance, and PMI. All values
              are stored locally.
            </p>

            <div className="mt-6 space-y-6">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Home price
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={0}
                    step={500}
                    value={homePrice}
                    onChange={(e) =>
                      handleHomePriceChange(Number(e.target.value || 0))
                    }
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Down payment
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={0}
                    step={100}
                    value={downAmount}
                    onChange={(e) =>
                      handleDownAmountChange(Number(e.target.value || 0))
                    }
                    className="w-1/2 rounded-md border px-3 py-2"
                  />

                  <div className="w-1/2">
                    <label className="mb-1 block text-xs text-slate-500">
                      Percent
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={0.1}
                      value={downPercent}
                      onChange={(e) =>
                        handleDownPercentChange(Number(e.target.value || 0))
                      }
                      className="w-full"
                    />
                    <div className="mt-1 text-sm text-slate-600">
                      {downPercent}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Loan term (years)
                  </label>
                  <select
                    value={termYears}
                    onChange={(e) => setTermYears(Number(e.target.value))}
                    className="w-full rounded-md border px-3 py-2"
                  >
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                    <option value={30}>30</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Interest rate (annual %)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={interestRate}
                    onChange={(e) =>
                      setInterestRate(Number(e.target.value || 0))
                    }
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Property tax (monthly)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={propTaxMonthly}
                    onChange={(e) =>
                      setPropTaxMonthly(Number(e.target.value || 0))
                    }
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Homeowner insurance (monthly)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={insuranceMonthly}
                    onChange={(e) =>
                      setInsuranceMonthly(Number(e.target.value || 0))
                    }
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    HOA (monthly)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={hoaMonthly}
                    onChange={(e) => setHoaMonthly(Number(e.target.value || 0))}
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  ZIP code (optional)
                </label>
                <input
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-48 rounded-md border px-3 py-2"
                  placeholder="e.g. 421005"
                />
                <p className="mt-2 text-xs text-slate-500">
                  ZIP is stored locally only. We do not call any external APIs
                  in this replica.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={() => {
                    /* recalculation happens automatically */
                  }}
                >
                  Calculate
                </Button>
                <Button variant="ghost" onClick={resetToDefaults}>
                  Reset
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-5">
            <Card>
              <CardHeader>
                <CardTitle>Monthly estimate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-sm text-slate-500">
                      Principal &amp; interest
                    </div>
                    <div className="mt-1 text-2xl font-semibold">
                      {currency2(monthlyPrincipalAndInterest)}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-slate-500">Loan amount</div>
                    <div className="mt-1 font-medium">
                      {currency(principal)}
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600">Property taxes</div>
                    <div className="font-medium">
                      {currency2(propTaxMonthly)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600">
                      Homeowner insurance
                    </div>
                    <div className="font-medium">
                      {currency2(insuranceMonthly)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600">HOA</div>
                    <div className="font-medium">{currency2(hoaMonthly)}</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600">PMI (estimate)</div>
                    <div className="font-medium">
                      {pmiMonthly ? currency2(pmiMonthly) : "—"}
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">
                    Estimated monthly payment
                  </div>
                  <div className="text-2xl font-extrabold">
                    {currency2(totalMonthlyPayment)}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-slate-600">
                  <div>
                    <div>Loan term</div>
                    <div className="font-medium">{termYears} years</div>
                  </div>
                  <div>
                    <div>Total months</div>
                    <div className="font-medium">{totalMonths}</div>
                  </div>

                  <div>
                    <div>Total interest (est.)</div>
                    <div className="font-medium">
                      {currency2(totalInterestPaid)}
                    </div>
                  </div>

                  <div>
                    <div>Total paid (all costs)</div>
                    <div className="font-medium">{currency2(totalPaidAll)}</div>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-500">
                  Notes: This calculator runs fully in your browser and stores
                  values locally. PMI is estimated at 0.5% yearly when down
                  payment is less than 20%. Taxes &amp; insurance are
                  user-provided (monthly). This is an educational replica and
                  not an offer.
                </p>
              </CardContent>
            </Card>

            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc space-y-2 text-sm text-slate-700">
                    <li>
                      Increase your down payment to reduce or eliminate PMI.
                    </li>
                    <li>
                      Compare interest rates across lenders — a small percentage
                      change changes payments significantly.
                    </li>
                    <li>
                      Property taxes and insurance vary widely by ZIP code —
                      update them for better estimates.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-10 text-right">
          <Link href="/start">
            <Button variant="ghost">Back to Start</Button>
          </Link>
        </div>
      </section>

      <Separator />
    </main>
  );
}
