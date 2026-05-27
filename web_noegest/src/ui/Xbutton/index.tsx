// src/ui/Xbutton/index.tsx

import type { ReactNode,  ButtonHTMLAttributes } from 'react'
import * as s from './index.css.ts'


interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  altClassName?: string;
}

export function Xbutton({
  children, 
  altClassName = "",
  ...props}: Props
) {

  const btnStyle = altClassName ? `${s.baseStyle} ${altClassName}`.trim() :  `${s.baseStyle} ${s.altDefault}`.trim();
  return (
    <button  
    className={btnStyle} 
    {...props}>
        {children}
    </button>
  )
}
