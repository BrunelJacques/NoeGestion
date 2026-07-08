//src/utils/string.ts

function titleCase(str: string) {
  return str
    .split(/[-_ ]+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function capitalize(str?: string | null) {
  // transforme en titre avec espaces une chaîne à mots composés
  if (!str) return "";
  if (str.length === 1) return str.toUpperCase();
  if (str.split(/[-_ ]+/).length > 1) return titleCase(str);
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export function standardize(str: string) {
  // ramène une chaîne épurée de casse espaces accents et caractères spéciaux
  return str
            .normalize("NFD") // sépare lettre et accent en deux octets
            .replace(/[\u0300-\u036f]/g, "") // supprime l'accent et garde la lettre
            .toLowerCase()
            .replace(/\s+/g, "") // supprime tout espace dans la chaîne
            .replace(/[^a-z0-9]/g, "") // supprime le non alphanumérique
  }
