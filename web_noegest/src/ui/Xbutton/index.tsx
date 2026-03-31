// src/ui/Xbutton/index.tsx

import { ReactNode,  ButtonHTMLAttributes } from 'react'
import * as s from './index.css.ts'


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  altClassName?: string;
}

export default function Xbutton({children, altClassName = "", ...props}: ButtonProps) {
  return (
    <button  
    className={s.buttonStyle + " " + altClassName} 
    {...props}>
        {children}
    </button>
  )
}
