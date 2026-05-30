//src/ui/DisplayValue/index.tsx
import React from 'react';
import  * as s  from './index.css.ts';
import { assignInlineVars } from '@vanilla-extract/dynamic';

interface BaseProps {
  justify?: 'left' | 'center' | 'right';
  width?: number; // largeur spécifique pour ce champ
}

// Props spécifiques selon le type de la valeur
type NumberProps = BaseProps & {
  value: number;
  nbDecimals?: number;
};

type OtherProps = BaseProps & {
  value: string | Date;
  nbDecimals?: never; // Interdit l'usage de cette prop si non nombre
};

type FieldProps = NumberProps | OtherProps;
 

export const DisplayValue: React.FC<FieldProps> = ({ 
  value,
  nbDecimals, 
  justify = 'left',
  width
}) => {
  
  // Fonction de formatage interne
  const formatValue = (): string => {
    if (value instanceof Date) {
      return value.toLocaleDateString(); // À adapter (ex: Intl.DateTimeFormat)
    }
    if (typeof value === 'number') {
      return value.toFixed(nbDecimals ?? 2); // 2 décimales par défaut si omit
    }
    return value;
  };

  return (
    <span 
    style={assignInlineVars({[s.widthVar]: width ? `${width}px` : "83px" })}
    className={ `${s.displayRecipe({ justify })} ${s.widthStyle}` }
    >
      {formatValue()}
    </span>
  );
};