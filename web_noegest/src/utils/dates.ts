//src/utils/dates.ts

export function dateToStringFr(jour:Date|null): string{

  if (!jour){
    console.log("dateToString jour NON date:",jour, typeof(jour))
    return ""
  }

  // On vérifie que la date créée est valide (évite les "Invalid Date")
  if (isNaN(jour.getTime())) {
    console.error("XinputDate: La prop 'jour' fournie n'est pas une date valide", jour);
    return "";
  }
  const dateFr = jour.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return dateFr;
}

export function dateToISO(jour:Date|null): string{

  if (!jour){
    console.log("dateToString jour NON date:",jour, typeof(jour))
    return ""
  }
  const dateIso = `${
    jour.getFullYear()
  }-${
    String(jour.getMonth() + 1).padStart(2, '0')
  }-${
    String(jour.getDate()).padStart(2, '0')}`
    return dateIso;
}

export function stringToDate(txt: string): Date | null {

  if (typeof(txt) !== "string") {
    return null;
  }
  // Format ISO / standard: 2026-05-18,  2026-05-18T10:30:00
  const txt10 = txt.substring(0, 10);
  if (/^\d{4}-\d{2}-\d{2}/.test(txt10)) {
    const date = new Date(txt10);
    return isNaN(date.getTime()) ? null : date;
  }
  if (/^\d{4}-\d{2}-\d{2}/.test(txt.substring(0, 10))) {
    const date = new Date(txt);
    return isNaN(date.getTime()) ? null : date;
  }

  // Format français: 18/05/2026, 18-05-2026, 18052026
  if (txt.length < 10) {
    return null;
  }

  const cleanDigits = txt.replace(/\D/g, "");
  const day = parseInt(cleanDigits.substring(0, 2), 10);
  const month = parseInt(cleanDigits.substring(2, 4), 10) - 1;
  const year = parseInt(cleanDigits.substring(4, 8), 10);
  const date = new Date(year, month, day);

  // évite les dates invalides comme 31/02/2026
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

export function stringToFormatted(txt: string): string {
  const digits = txt.replace(/\D/g, "").slice(0, 8);

  if (!digits) return "";

  let out = digits.slice(0, 2);
  if (digits.length >= 2) out += "/" + digits.slice(2, 4);
  if (digits.length >= 4) out += "/" + digits.slice(4, 8);

  return out;
}

// test date valide au format français jj/mm/aaaa
export function isValidDateFr(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");
  if (digits.length !== 8) return false;

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

// test date valide au format Date
export function isValidDate(date: Date): boolean {
  const digits = date.toISOString()
  if (digits.length !== 8) return false;

  const d = parseInt(digits.slice(0, 2));
  const m = parseInt(digits.slice(2, 4));
  const y = parseInt(digits.slice(4, 8));

  return (
    date.getFullYear() === y &&
    date.getMonth() === m - 1 &&
    date.getDate() === d
  );
}


