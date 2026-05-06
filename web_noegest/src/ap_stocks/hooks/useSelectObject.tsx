//src/ap_stocks/hooks/useSelectObject.tsx
import { useMemo, useState } from "react";

export function useSelectObject<
  T extends { id: string | number; libelle: string }
>(
  items: T[],
  initialId: T["id"]
) {
  const [value, setValue] = useState<T["id"]>(initialId);

  // Génère les options automatiquement
  const options = useMemo(() => {
    return items.map((item) => ({
      value: item.id,
      label: item.libelle,
    }));
  }, [items]);

  // Convertit automatiquement la valeur venant du <select>
  const onChange = (raw: string|number) => {
    const sample = items[0]?.id;

    const typed =
      typeof sample === "number" ? Number(raw) : raw;

    setValue(typed as T["id"]);
  };

  // Retrouve l'objet complet
  const selectedItem = useMemo(
    () => items.find((s) => s.id === value) ?? null,
    [items, value]
  );

  return { value, setValue, onChange, options, selectedItem };
}
