//src/utils/getCellValue.tsx


// getCellValue extrait une valeur calculée depuis un dataRow, selon field: GridField et fnCalculs

type GridField<TRow> = {
  fieldName?: keyof TRow;
  subFieldName?: string;
  default?: string | number | Date;
  calcul?: string;
};

type TypeFnCalculs<TRow> = Record<string, (row: TRow) => string | number>;

const toDisplayValue = (value: unknown): string | number => {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  return "";
};


export const getCellValue = <TRow extends object>(
  rowData: TRow,
  field: GridField<TRow>,
  dicCalculs: TypeFnCalculs<TRow>
): string | number => {
  if (field.calcul) {
    const fonctionAExecuter = dicCalculs?.[field.calcul];

    if (!fonctionAExecuter) {
      console.error(`La fonction ${field.calcul} n'existe pas dans ${dicCalculs}.`);
      return "";
    }

    try {
      return fonctionAExecuter(rowData);
    } catch (error) {
      console.error(`Erreur dans la fonction ${field.calcul}:`, error);
      return "";
    }
  }

  if (!field.fieldName) {
    return field.default?.toString() ?? "";
  }

  const value = rowData[field.fieldName];

  if (field.subFieldName) {
    if (value == null || typeof value !== "object") {
      return "";
    }

    const nestedValue = (value as Record<string, unknown>)[field.subFieldName];
    return toDisplayValue(nestedValue);
  }

  return toDisplayValue(value);
};

