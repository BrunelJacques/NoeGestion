// src/ui/Xinput/formatters/date.ts
export function formatDateInput(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 8);

  if (!digits) return "";

  let out = digits.slice(0, 2);
  if (digits.length > 2) out += "/" + digits.slice(2, 4);
  if (digits.length > 4) out += "/" + digits.slice(4, 8);

  return out;
}

export function isValidDate(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  if (digits.length !== 8) return true;

  const d = parseInt(digits.slice(0, 2));
  const m = parseInt(digits.slice(2, 4));
  const y = parseInt(digits.slice(4, 8));

  const date = new Date(y, m - 1, d);
  return (
    date.getFullYear() === y &&
    date.getMonth() === m - 1 &&
    date.getDate() === d
  );
}
