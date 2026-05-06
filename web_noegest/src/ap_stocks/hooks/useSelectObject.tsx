//src/ap_stocks/hooks/useSelectObject.tsx
import { useMemo, useState } from "react";

export function useSelectObject<
  T extends { id: string | number; libelle: string }
>(
  items: T[] | undefined,
  initialId: T["id"]
) {
  // 1) State interne
  const [value, setValue] = useState<T["id"]>(initialId);

  // 2) Options sécurisées
  const options = useMemo(() => {
    return items?.map((item) => ({
      value: item.id,
      label: item.libelle,
    })) ?? [];
  }, [items]);

  // 3) Valeur dérivée : si value n'existe plus → fallback sur items[0]
  const safeValue = useMemo(() => {
    if (!items || items.length === 0) return value;
    const exists = items.some((i) => i.id === value);
    return exists ? value : items[0].id;
  }, [items, value]);

  // 4) Conversion automatique depuis <select>
  const onChange = (raw: string|number) => {
    const sample = items?.[0]?.id ?? initialId;
    const typed =
      typeof sample === "number" ? Number(raw) : raw;
    setValue(typed as T["id"]);
  };

  // 5) Objet sélectionné
  const selectedItem = useMemo(() => {
    return items?.find((s) => s.id === safeValue) ?? null;
  }, [items, safeValue]);

  return { value: safeValue, setValue, onChange, options, selectedItem };
}
