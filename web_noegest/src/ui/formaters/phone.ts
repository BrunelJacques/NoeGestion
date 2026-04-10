// src/ui/formateurs/phone.ts

export const formatPhone = (value: string): string => {
  // Supprime tout sauf les chiffres
  const digits = value.replace(/\D/g, "");

  // Limite à 10 chiffres (format FR)
  const trimmed = digits.slice(0, 10);

  // Ajoute un espace tous les 2 chiffres
  return trimmed.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
};

export const formatInternationalPhone = (value: string): string => {
  let digits = value.replace(/[^\d+]/g, "");

  // Garde le + uniquement en début
  if (digits.includes("+")) {
    digits = "+" + digits.replace(/\+/g, "");
  }

  return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
};


export const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
};


export const getCursorPosition = (formatted: string, digitIndex: number): number => {
  let count = 0;

  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i])) {
      count++;
    }
    if (count === digitIndex) {
      return i + 1;
    }
  }

  return formatted.length;
};


type HandlePhoneChangeParams = {
  event: React.ChangeEvent<HTMLInputElement>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export const handlePhoneChange = ({
  event,
  inputRef,
  setValue,
}: HandlePhoneChangeParams) => {
  const input = event.target;
  const rawValue = input.value;

  const cursorPosition = input.selectionStart || 0;

  const digitsBeforeCursor = rawValue
    .slice(0, cursorPosition)
    .replace(/\D/g, "").length;

  const formatted = formatPhoneNumber(rawValue);

  setValue(formatted);

  requestAnimationFrame(() => {
    if (inputRef.current) {
      const newCursor = getCursorPosition(formatted, digitsBeforeCursor);
      inputRef.current.setSelectionRange(newCursor, newCursor);
    }
  });
};