import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const chfFormatter = new Intl.NumberFormat("de-CH", { maximumFractionDigits: 0 })

export function formatChf(value: number | string | null | undefined): string {
  const n = typeof value === "number" ? value : Number(value)
  if (!Number.isFinite(n)) return "—"
  return chfFormatter.format(n)
}
