//src/utils/number.ts

export function round(value?: number | null, decimals = 0): number {
  if (value == null) return 0;
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}