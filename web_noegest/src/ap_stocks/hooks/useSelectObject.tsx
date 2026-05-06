//src/ap_stocks/hooks/useSelectObject.tsx
import { useMemo, useState } from "react";

export function useSelectObject<
  T extends { id: string | number; libelle: string }
>(
  items: T[] | undefined,
  initialId: T["id"]
) {
  const [value, setValue] = useState<T["id"]>(initialId);

  // Génère les options automatiquement
  const options = useMemo(() => {
    if (!items) return [];
    return items.map((item) => ({
      value: item.id,
      label: item.libelle,
    }));
  }, [items]);

  // Conversion automatique
  const onChange = (raw: string|number) => {
    const sample = items?.[0]?.id ?? initialId;

    const typed =
      typeof sample === "number" ? Number(raw) : raw;

    setValue(typed as T["id"]);
  };

  // Objet sélectionné
  const selectedItem = useMemo(() => {
    if (!items) return null;
    return items.find((s) => s.id === value) ?? null;
  }, [items, value]);

  return { value, setValue, onChange, options, selectedItem };
}
