//src/utils/string.ts

function titleCase(str: string) {
  return str
    .split(/[-_ ]+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function capitalize(str?: string | null) {
  if (!str) return "";
  if (str.length === 1) return str.toUpperCase();
  if (str.split(/[-_ ]+/).length > 1) return titleCase(str);
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}