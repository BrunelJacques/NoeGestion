// src/ui/Xautocomplete/checkIsValid.ts
import type { Item } from '../../ap_stocks/types/mvtFiltres';

// Valide si la saisie correspond à un item existant ou respecte la contrainte "required"
export function checkIsValid(query: string, results: Item[], required: boolean): boolean {
  if (!query && !required) {
    return true;
  }
  if (!results || results.length === 0) {
    return false;
  }
  const test1 = results.some(item => item.nom.toLowerCase() === query.toLowerCase());
  const test2 = query === "" && !required;
  return test1 || test2;
}
