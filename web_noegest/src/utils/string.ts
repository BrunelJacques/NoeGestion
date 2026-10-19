//src/utils/string.ts

function titleCase(str: string) {
  // Remplace '_' par un espace suivi d'une majuscule
  return str
    .split(/[-_ ]+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function capitalize(str?: string | null) {
  // Transforme en titre avec espaces une chaîne à mots composés
  if (!str) return "";
  if (str.length === 1) return str.toUpperCase();
  if (str.split(/[-_ ]+/).length > 1) return titleCase(str);
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export function standardize(value: string|number):string {
    // Enlève les accents, les espaces et les majuscules, filtres les caractères spéciaux
    const str = typeof(value) === "string"? value:String(value)
    return str
              .normalize("NFD") // sépare lettre et accent en deux octets
              .replace(/[\u0300-\u036f]/g, "") // supprime l'accent et garde la lettre
              .toLowerCase()
              .replace(/\s+/g, "") // supprime tout espace dans la chaîne
              .replace(/[^a-z0-9]/g, "") // supprime le non alphanumérique
  }

export function supprEspaceNoCamel(str?: string | null) {
    // Ote les espaces non suivis d'une majuscule'
    if (!str) return "";
    return str.replace(/\s+(?![A-Z])/g, '');
  }

export function spaceCamel(str?: string | null) {
    // Ajoute un espace entre minuscule suivie de majuscule
    if (!str) return "";
    return  str.replace(/(\p{Ll})(\p{Lu})/gu, '$1 $2');
  };

export function fmtLabel(str?:string) {
  // Combine supprEspaceNoCamel et spaceCamel, format label aéré pour un form
   if (!str) return "";
   return supprEspaceNoCamel(spaceCamel(str))
  }
