// src/ui/formaters/cursorHandle.ts
// gère le curseur en modif-saisie pour les entrees reformatées, évite le end posit 

const getCursorPosition = (formatted: string, digitIndex: number): number => {
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


type HandleCursorParams = {
  event: React.ChangeEvent<HTMLInputElement>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  formatValue: (x:string) => string ;
};

export const handleCursor = ({
  event,
  inputRef,
  formatValue,// fonction de formatage de la saisie input
  setValue, // renverra value formatée, repositionnement cursor est après
 
}: HandleCursorParams) => {
  const input = event.target;
  const rawValue = input.value;

  const cursorPosition = input.selectionStart || 0;

  const digitsBeforeCursor = rawValue
    .slice(0, cursorPosition)
    .replace(/\D/g, "").length;

  const formatted = formatValue(rawValue);

  setValue(formatted);

  requestAnimationFrame(() => {
    if (inputRef.current) {
      const newCursor = getCursorPosition(formatted, digitsBeforeCursor);
      inputRef.current.setSelectionRange(newCursor, newCursor);
    }
  });
};