// Take-home pay math for the Paycheck Calculator. Kept out of the page
// component so it can be unit-tested with Node's test runner.

// 2026 federal figures, single filer (IRS Rev. Proc. 2025-32; SSA 2026 COLA notice).
export const STANDARD_DEDUCTION_2026 = 16100;
export const BRACKETS_2026 = [
  { upTo: 12400, rate: 0.1 },
  { upTo: 50400, rate: 0.12 },
  { upTo: 105700, rate: 0.22 },
  { upTo: 201775, rate: 0.24 },
  { upTo: 256225, rate: 0.32 },
  { upTo: 640600, rate: 0.35 },
  { upTo: Infinity, rate: 0.37 },
];

// FICA = Social Security + Medicare. Social Security stops at the annual wage
// base; Medicare has no cap and adds 0.9% on wages above $200,000.
export const SOCIAL_SECURITY_RATE = 0.062;
export const SOCIAL_SECURITY_WAGE_BASE_2026 = 184500;
export const MEDICARE_RATE = 0.0145;
export const ADDITIONAL_MEDICARE_RATE = 0.009;
export const ADDITIONAL_MEDICARE_THRESHOLD = 200000;

export function computeFica(grossAnnual) {
  const socialSecurity =
    Math.min(grossAnnual, SOCIAL_SECURITY_WAGE_BASE_2026) * SOCIAL_SECURITY_RATE;
  const medicare =
    grossAnnual * MEDICARE_RATE +
    Math.max(0, grossAnnual - ADDITIONAL_MEDICARE_THRESHOLD) * ADDITIONAL_MEDICARE_RATE;
  return socialSecurity + medicare;
}

/**
 * Educational take-home estimate: 2026 single-filer brackets after the standard
 * deduction, plus FICA. No state/local tax, credits, or benefits.
 */
export function computePaycheck({ mode, salary, wage, hoursPerWeek, periodsPerYear }) {
  const hours = mode === "salary" ? 40 : hoursPerWeek;
  const grossAnnual = mode === "salary" ? salary : wage * hoursPerWeek * 52;

  const taxable = Math.max(0, grossAnnual - STANDARD_DEDUCTION_2026);
  let federal = 0;
  let prev = 0;
  for (const { upTo, rate } of BRACKETS_2026) {
    if (taxable <= prev) break;
    federal += (Math.min(taxable, upTo) - prev) * rate;
    prev = upTo;
  }

  const fica = computeFica(grossAnnual);
  const takeHomeAnnual = grossAnnual - federal - fica;

  const per = (n) => n / periodsPerYear;
  return {
    grossAnnual,
    federal,
    fica,
    takeHomeAnnual,
    grossPer: per(grossAnnual),
    federalPer: per(federal),
    ficaPer: per(fica),
    takeHomePer: per(takeHomeAnnual),
    effectiveRate: grossAnnual > 0 ? (federal + fica) / grossAnnual : 0,
    grossHourly: hours > 0 ? grossAnnual / (hours * 52) : 0,
    trueHourly: hours > 0 ? takeHomeAnnual / (hours * 52) : 0,
  };
}
