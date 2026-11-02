//src/utils/number.ts

export function round(value?: number | null, decimals = 0): number {
  if (value == null) return 0;
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function trueNumber(anyValue: any) :number{
  if (!anyValue) return 0;

  const strValue = String(anyValue)
  // Vérifie si le premier caractère est un signe (+ ou -)
  const firstChar = strValue[0];
  const hasSign = firstChar === '+' || firstChar === '-';

  // Isole le signe et nettoyer tout le reste
  const sign = hasSign ? firstChar : '';
  const rest = (
    hasSign ? strValue.slice(1) : strValue
  ).replace(/\D/g, ''); // supprime les non-digit par: \D

  const cleanValue = sign + rest;

  // Si la chaîne est juste un signe ou vide, retourne 0
  if (cleanValue === '-' || cleanValue === '+' || cleanValue === '') {
   return 0;
  }

  return Number(cleanValue) || 0;
}
