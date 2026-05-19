//src/utils/dates.ts

export function stringToDate(txt:string):Date|null{
  // Nettoie la chaîne pour ne garder que les chiffres (ex: "18/05/2026" -> "18052026")

    const cleanDigits = txt.replace(/\D/g, "");
    if (cleanDigits == "") {
      return null
    }
    
    const day = parseInt(cleanDigits.substring(0, 2), 10);
    const month = parseInt(cleanDigits.substring(2, 4), 10) - 1; // Mois 0-11
    const year = parseInt(cleanDigits.substring(4, 8), 10);
    const jour = new Date(year, month, day);

    return jour
}

export function dateToString(jour:Date|null): string{
  if (!jour) {return ""}

  // Sécurité : Si 'jour' est un string (ex: "2026-05-18"), on l'instancie en Date
  const dateObj = jour instanceof Date ? jour : null

  if (!dateObj){
    console.log("dateToString jour NON date:",jour, typeof(jour))
    return ""
  }

  // On vérifie que la date créée est valide (évite les "Invalid Date")
  if (isNaN(dateObj.getTime())) {
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

export function stringToFormatted(txt: string): string {
  const digits = txt.replace(/\D/g, "").slice(0, 8);

  if (!digits) return "";

  let out = digits.slice(0, 2);
  if (digits.length >= 2) out += "/" + digits.slice(2, 4);
  if (digits.length >= 4) out += "/" + digits.slice(4, 8);

  return out;
}

export function isValidDate(raw: string): boolean {
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


