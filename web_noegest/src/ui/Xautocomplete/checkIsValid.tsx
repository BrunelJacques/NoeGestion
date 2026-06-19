// src/ui/Xautocomplete/checkIsValid.ts
import type { Item } from '../../types/item';

// Valide si la saisie correspond à un item existant ou respecte la contrainte "required"
export function checkIsValid(
  query: string,
  results: Item[],
  required: boolean,
  allowNull: boolean): boolean
{
  if (!query && !required) {
    return true;
  }
  if (!allowNull && (!results || results.length === 0)) {
    return false;
  }
  if (allowNull && !query) {
    return true;
  }
  const test1 = results.some(item => item.nom.toLowerCase() === query.toLowerCase());
  const test2 = query === "" && !required;
  return test1 || test2;
}
