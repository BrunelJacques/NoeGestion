// src/ui/Xdate/index.tsx
import { ComponentPropsWithoutRef, useState, ChangeEvent } from 'react';
import { inputStyle, errorStyle } from './index.css';


// On utilise Omit pour remplacer le onChange standard par le tien (qui attend une string)
interface XinputProps extends Omit<
  ComponentPropsWithoutRef<"input">, 
  "onChange"
>{
    onChange?: (value: string) => void;
    altClassName?: string;
    label?: string;
}


export default function XdateInput(props: XinputProps) {
  const [date, setDate] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // On retire tout ce qui n'est pas un chiffre
    
    if (value.length > 8) value = value.slice(0, 8); // On limite à 8 chiffres (jjmmaaaa)

    // Formatage dynamique : jj/mm/aaaa
    let formattedValue = '';
    if (value.length > 0) {
      formattedValue = value.substring(0, 2);
      if (value.length > 2) {
        formattedValue += '/' + value.substring(2, 4);
      }
      if (value.length > 4) {
        formattedValue += '/' + value.substring(4, 8);
      }
    }

    setDate(formattedValue);

    // Validation basique si la date est complète
    if (value.length === 8) {
      const day = parseInt(value.substring(0, 2));
      const month = parseInt(value.substring(2, 4));
      const year = parseInt(value.substring(4, 8));
      
      // Vérification simple de la validité (mois entre 1-12, jours 1-31)
      const dateObj = new Date(year, month - 1, day);
      const isDateValid = 
        dateObj.getFullYear() === year && 
        dateObj.getMonth() === month - 1 && 
        dateObj.getDate() === day;
      
      setIsValid(isDateValid);
    } else {
      setIsValid(true); // On ne montre pas d'erreur tant que la saisie est en cours
    }
  };

  return (
    <div>
      <input
        {...props}
        type="text"
        placeholder="JJ/MM/AAAA"
        value={date}
        onChange={handleDateChange}
        className={inputStyle}
        maxLength={10} // "10/10/2024" = 10 caractères
      />
      {!isValid && <p className={errorStyle}>Date invalide</p>}
    </div>
  );
};
