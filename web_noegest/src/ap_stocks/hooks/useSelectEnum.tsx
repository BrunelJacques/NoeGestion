//src/ap_stocks/hooks/useSelectEnum.tsx
import { useMemo, useState } from "react";

export function useSelectEnum<T extends string | number>(
  enumObj: Record<string, T>,
  initial: T 
) {
  const [value, setValue] = useState<T>(initial);

  // Génère automatiquement les options à partir de l’enum
  const options = useMemo(() => {
    return Object.values(enumObj).map((v) => ({
      value: v,
      label: String(v).charAt(0).toUpperCase() + String(v).slice(1),
    }));
  }, [enumObj]);

  // onChange déjà typé et converti
  const onChange = (raw: string) => {
    const typed = (typeof initial === "number" ? Number(raw) : raw) as T;
    setValue(typed);
  };

  return { value, setValue, onChange, options };
}
