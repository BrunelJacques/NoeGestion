//src/ap_stocks/hooks/useSelectObject.tsx
import { useEffect, useMemo, useState } from "react";

export function useSelectObject<
  T extends { id: string | number; libelle: string }
>(
  items: T[] | undefined,
  initialId: T["id"]
) {
  const [value, setValue] = useState<T["id"]>(initialId);

  // Réinitialise automatiquement si items change
  useEffect(() => {
    if (!items || items.length === 0) return;

    // Si la valeur actuelle n'existe plus → reset
    const exists = items.some((i) => i.id === value);
    if (!exists) {
      setValue(items[0].id);
    }
  }, [items]);

  // Options sécurisées
  const options = useMemo(() => {
    return items?.map((item) => ({
      value: item.id,
      label: item.libelle,
    })) ?? [];
  }, [items]);

  // Conversion automatique
  const onChange = (raw: string|number) => {
    const sample = items?.[0]?.id ?? initialId;
    const typed =
      typeof sample === "number" ? Number(raw) : raw;
    setValue(typed as T["id"]);
  };

  const selectedItem = useMemo(() => {
    return items?.find((s) => s.id === value) ?? null;
  }, [items, value]);

  return { value, setValue, onChange, options, selectedItem };
}
