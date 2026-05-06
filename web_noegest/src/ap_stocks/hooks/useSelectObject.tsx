//src/ap_stocks/hooks/useSelectObject.tsx
import { useMemo, useState } from "react";

export function useSelectObject<T extends { id: number; libelle: string }>(
  items: T[],
  initialId: number
) {
  const [value, setValue] = useState<number>(initialId);

  // Génère les options automatiquement
  const options = useMemo(() => {
    return items.map((item) => ({
      value: item.id,
      label: item.libelle,
    }));
  }, [items]);

  // onChange convertit automatiquement en number
  const onChange = (raw: string|number) => {
    setValue(Number(raw));
  };

  // Optionnel : retrouver l’objet complet
  const selectedItem = useMemo(
    () => items.find((s) => s.id === value) ?? null,
    [items, value]
  );

  return { value, setValue, onChange, options, selectedItem };
}
